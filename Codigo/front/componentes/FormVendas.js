import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  DarkMode,
  FormControl,
  Grid,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import SecaoProduto from "./SecaoProduto";
import axios from "axios";

export default function FormVendas(props) {
  // const initialValue = useRef("teste")
  const [clientes, setClientes] = useState([]);
  const [secaoProdutos, setSecaoProdutos] = useState([
    <SecaoProduto produtoId="produto 0" quantidadeId="quantidade 0" key={0} />,
  ]);

  const [form, setForm] = useState(
    props.initialState == undefined ? "" : props.initialState
  );

  useEffect(() => {
    return () => {
      axios
        .get("http://localhost:8081/clientes")
        .then(function (response) {
          setClientes(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }, []);

  function handleAdicionarProduto() {
    // initialValue.current = "teste mudou"
    setSecaoProdutos(
      secaoProdutos.concat(
        <SecaoProduto
          produtoId={"produto " + secaoProdutos.length}
          quantidadeId={"quantidade " + secaoProdutos.length}
          key={secaoProdutos.length}
        />
      )
    );
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  // function updateValorTotal() {
  //   var valorTotal = 0
  //   secaoProdutos.forEach(element => {
  //     const value = document.getElementById(element.props.produtoId).value
  //     valorTotal += parseInt(value.replace("R$ ", ""));
  //   });
  //   console.log(secaoProdutos)
  //   setForm({
  //     ...form,
  //     valorTotal: valorTotal,
  //   });
  // }

  return (
    <FormControl>
      <Grid
        templateAreas={`"headerProdutos"
                        "produtos"
                        "headerTotal"
                        "total"
                        "button"`}
        gap={"2"}
      >
        <GridItem area={"headerProdutos"}>
          <Text fontSize="sm" fontWeight="bold">
            Seleção de Produtos
          </Text>
        </GridItem>
        <GridItem area={"produtos"}>
          {secaoProdutos}
          <DarkMode>
            <Button
              colorScheme="green"
              leftIcon={<AddIcon />}
              onClick={handleAdicionarProduto}
            >
              Adicionar Produto
            </Button>
          </DarkMode>
        </GridItem>
        <GridItem area={"headerTotal"}>
          <Text fontSize="sm" fontWeight="bold">
            Total
          </Text>
        </GridItem>
        <GridItem area={"total"}>
          <SimpleGrid columns="3" spacingX={"4"} spacingY={"2"}>
            <Select id="clientes" placeholder="Cliente">
              {clientes.map((cliente) => (
                <option key={cliente.id} id={cliente.id}>{cliente.nome}</option>
              ))}
            </Select>
            <Select id="tipoPagamento" placeholder="Tipo de Pagamento">
              <option>Cartão de Crédito</option>
              <option>Cartão de Débito</option>
              <option>Dinheiro</option>
            </Select>
            <NumericFormat
              id="valorTotal"
              placeholder="Valor Total"
              defaultValue={0}
              value={form.valorTotal}
              prefix="R$ "
              customInput={Input}
            />
          </SimpleGrid>
        </GridItem>
        <GridItem area={"button"} paddingTop="2">
          {props.button}
        </GridItem>
      </Grid>
    </FormControl>
  );
}
