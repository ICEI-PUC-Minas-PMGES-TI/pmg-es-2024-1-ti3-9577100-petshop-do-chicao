import { AddIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
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
import { useEffect, useState } from "react";
import axios from "axios";

export default function FormVendas(props) {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/clientes")
      .then(function (response) {
        setClientes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8081/products")
      .then(function (response) {
        setProdutos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleAddItem = () => {
    if (!selectedProduto || quantidade <= 0) {
      alert("Por favor, selecione um produto e insira uma quantidade válida.");
      return;
    }

    const novoItem = {
      idproduto: parseInt(selectedProduto),
      qtde: parseInt(quantidade),
    };

    props.setItensVenda((prevItensVenda) => [...prevItensVenda, novoItem]);

    setSelectedProduto('');
    setQuantidade('');
  };

  const handleClienteChange = (e) => {
    props.setIdCliente(e.target.value);
  };

  const handleTipoPagamentoChange = (e) => {
    props.setTipoPagamento(e.target.value);
  };

  return (
    <FormControl id="formVenda">
      <Grid
        templateAreas={`"headerProdutos"
                        "produtos"
                        "tabela"
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
          <SimpleGrid columns="3" spacingX={"4"} spacingY={"2"} paddingBottom={2}>
            <Select
              placeholder="Produto"
              value={selectedProduto}
              onChange={(e) => setSelectedProduto(e.target.value)}
            >
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.produto_descricao}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Quantidade"
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
            <DarkMode>
              <Button
                colorScheme="green"
                leftIcon={<AddIcon />}
                onClick={handleAddItem}
              >
                Salvar
              </Button>
            </DarkMode>
          </SimpleGrid>
        </GridItem>
        <GridItem area={"headerTotal"}>
          <Text fontSize="sm" fontWeight="bold">
            Total
          </Text>
        </GridItem>
        <GridItem area={"tabela"}>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Id produto</Th>
                  <Th>Quantidade</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.itensVenda.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.idproduto}</Td>
                    <Td>{item.qtde}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem area={"total"}>
          <SimpleGrid columns="3" spacingX={"4"} spacingY={"2"}>
            <Select placeholder="Cliente" onChange={handleClienteChange}>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </Select>
            <Select placeholder="Tipo de Pagamento" onChange={handleTipoPagamentoChange}>
              <option>Cartão de Crédito</option>
              <option>Cartão de Débito</option>
              <option>Dinheiro</option>
            </Select>
          </SimpleGrid>
        </GridItem>
        <GridItem area={"button"} paddingTop="2">
          {props.button}
        </GridItem>
      </Grid>
    </FormControl>
  );
}
