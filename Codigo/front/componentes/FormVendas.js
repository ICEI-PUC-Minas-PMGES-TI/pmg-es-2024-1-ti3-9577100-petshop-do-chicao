import {
    FormControl,
    Input,
    Select,
    SimpleGrid,
    Text,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { PatternFormat } from "react-number-format";
  
  export default function FormVendas(props) {
    const initialState = {
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      senha: "",
      confirmarSenha: "",
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      complemento: "",
    };
  
    const [form, setForm] = useState(
      props.initialState == undefined ? initialState : props.initialState
    );
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setForm({
        ...form,
        [id]: value,
      });
    };
  
    return (
      <FormControl>
        <SimpleGrid columns={1} spacing={4}>
          <SimpleGrid columns="2" spacingX={"4"} spacingY={"2"}>
            <Select placeholder="Selecione um produto">
                <option>Teste</option>
            </Select>
            <Input
              placeholder="Nome"
              id="nome"
              value={form.nome}
              onChange={handleChange}
            />
            <Input
              placeholder="Quantidade"
              type="number"
              id="quantidade"
              value={form.quantidade}
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
          {props.button}
        </SimpleGrid>
      </FormControl>
    );
  }
  