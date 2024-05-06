import {
  FormControl,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { PatternFormat } from "react-number-format";

export default function FormFuncionarios(props) {
  const [form, setForm] = useState(props.initialState);
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  const handleCEPChange = (e) => {
    const cepReplaced = e.target.value.replace(/\D/g, "");
    if (cepReplaced.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cepReplaced}/json/`)
        .then((response) => {
          setForm({
            ...form,
            cep: response.data.cep,
            estado: response.data.uf,
            cidade: response.data.localidade,
            bairro: response.data.bairro,
            rua: response.data.logradouro,
          });
        })
        .catch((error) => {
          console.error("Erro ao buscar CEP:", error);
        });
      setDisabled(false);
    }
  };

  return (
    <FormControl>
      <Grid
        templateAreas={`"headerDadosPessoais"
                                "dadosPessoais"
                                "headerEndereco"
                                "endereco"
                                "button"`}
        gap={"2"}
      >
        <GridItem area={"headerDadosPessoais"}>
          <Text fontSize="sm" fontWeight="bold">
            Dados Pessoais
          </Text>
        </GridItem>
        <GridItem area={"dadosPessoais"}>
          <SimpleGrid columns="2" spacingX={"4"} spacingY={"2"}>
            <Input
              placeholder="Nome"
              id="nome"
              value={form.nome}
              onChange={handleChange}
            />
            <Input
              placeholder="Email"
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
            />
            <PatternFormat
              format="(##) #####-####"
              placeholder="Telefone"
              id="telefone"
              value={form.telefone}
              customInput={Input}
              onChange={handleChange}
            />
            <PatternFormat
              format="###.###.###-##"
              placeholder="CPF"
              id="cpf"
              value={form.cpf}
              customInput={Input}
              onChange={handleChange}
            />
            <Input
              placeholder="Senha"
              type="password"
              id="senha"
              value={form.senha}
              onChange={handleChange}
            />
            <Input
              placeholder="Confirmar Senha"
              type="password"
              id="confirmarSenha"
              value={form.confirmarSenha}
              onChange={handleChange}
            />
          </SimpleGrid>
        </GridItem>
        <GridItem area={"headerEndereco"}>
          <Text fontSize="sm" fontWeight="bold">
            Endereço
          </Text>
        </GridItem>
        <GridItem area={"endereco"}>
          <SimpleGrid columns="2" spacingX={"4"} spacingY={"2"}>
            <PatternFormat
              format="#####-###"
              placeholder="CEP"
              id="cep"
              value={form.cep}
              customInput={Input}
              onChange={handleCEPChange}
            />
            <Input
              placeholder="Estado"
              disabled={disabled}
              id="estado"
              value={form.estado}
              onChange={handleChange}
            />
            <Input
              placeholder="Cidade"
              disabled={disabled}
              id="cidade"
              value={form.cidade}
              onChange={handleChange}
            />
            <Input
              placeholder="Bairro"
              disabled={disabled}
              id="bairro"
              value={form.bairro}
              onChange={handleChange}
            />
            <Input
              placeholder="Rua"
              disabled={disabled}
              id="rua"
              value={form.rua}
              onChange={handleChange}
            />
            <Input
              placeholder="Complemento"
              id="complemento"
              value={form.complemento}
              onChange={handleChange}
            />
          </SimpleGrid>
        </GridItem>
        <GridItem area={"button"} paddingTop='2'>{props.button}</GridItem>
      </Grid>
    </FormControl>
  );
}
