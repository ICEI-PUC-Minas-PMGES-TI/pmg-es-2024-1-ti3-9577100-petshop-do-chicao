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
  const [total, setTotal] = useState(0);

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

    const produto = produtos.find(p => p.id === parseInt(selectedProduto));
    const novoItem = {
      idproduto: parseInt(selectedProduto),
      qtde: parseInt(quantidade),
      preco: produto ? produto.preco : 0,
    };

    props.setItensVenda((prevItensVenda) => [...prevItensVenda, novoItem]);

    const novoTotal = total + novoItem.qtde * novoItem.preco;
    setTotal(novoTotal);

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
                        "total"
                        "dados"
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
        <GridItem area={"total"}>
          <Text fontSize="lg" fontWeight="bold">
            Total: R$ {total.toFixed(2)}
          </Text>
        </GridItem>
        <GridItem area={"tabela"}>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Quantidade</Th>
                  <Th>Preço</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.itensVenda.map((item, index) => {
                  const produto = produtos.find(p => p.id === item.idproduto);
                  return (
                    <Tr key={index}>
                      <Td>{produto ? produto.produto_descricao : 'Produto não encontrado'}</Td>
                      <Td>{item.qtde}</Td>
                      <Td>{produto ? produto.preco.toFixed(2) : '0.00'}</Td>
                      <Td>{(item.qtde * (produto ? produto.preco : 0)).toFixed(2)}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem area={"dados"}>
          <SimpleGrid columns="2" spacingX={"4"} spacingY={"2"}>
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
              <option>Pix</option>
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
