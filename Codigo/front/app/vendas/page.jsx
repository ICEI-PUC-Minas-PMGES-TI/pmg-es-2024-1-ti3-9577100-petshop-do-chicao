"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ChakraProvider,
  Flex,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";

import { useDisclosure } from "@chakra-ui/react";
import FormVendas from "@/componentes/FormVendas";
import { theme } from "../theme";
// import FormProdutos from "@/componentes/FormProdutos";

export default function Vendas() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const {
  //   isOpen: isCreateProductOpen,
  //   onOpen: onCreateProductOpen,
  //   onClose: onCreateProductClose,
  // } = useDisclosure();
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const cancelRef = React.useRef();

  useEffect(() => {
    return () => {
      axios
        .get("http://localhost:8081/products")
        .then(function (response) {
          console.log(response);
          setProdutos(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("http://localhost:8081/vendas")
        .then(function (resposta) {
          console.log(resposta);
          setVendas(resposta.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }, []);

  const buscarProduto = () => {
    fetch("http://localhost:8081/products")
      .then((response) => response.json())
      .then((data) => {
        setProdutos({ products: data });
        console.log(produtos);
        console.log(response);
      });
  };
  const buscarVenda = () => {
    fetch("http://localhost:8081/vendas")
      .then((response) => response.json())
      .then((data) => {
        setVendas({ vendas: data });
        console.log(vendas);
        console.log(resposta);
      });
  };

  const deletarProduto = (id) => {
    fetch("http://localhost:8081/products" + "/" + id, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        this.buscarProduto();
      }
    });
  };

  const cadastraProduto = (produto) => {
    fetch("http://localhost:8081/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    }).then((response) => {
      if (response.ok) {
        this.buscarProduto();
      } else {
        alert("Não foi possível adicionar produto");
      }
    });
  };

  const atualizaDescricao = (d) => {
    this.setState({
      produto_descricao: d.target.value,
    });
  };

  const atualizaPreco = (p) => {
    this.setState({
      preco: p.target.value,
    });
  };

  const submit = () => {
    const produto = {
      produto_descricao: this.state.produto_descricao,
      preco: this.state.preco,
    };

    this.cadastraProduto();
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <Text>Vendas</Text>
        <Spacer />
        <Button onClick={onOpen}>Efetuar venda</Button>
      </Flex>

      <TableContainer paddingTop="14px">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Produto</Th>
              {/* <Th>Quantidade</Th>
              <Th>Vendedor</Th>
              <Th>Cliente</Th> */}
              <Th>Valor Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {produtos.map((produto) => (
              <Tr key={produto.idproducts}>
                <Td>{produto.produto_descricao}</Td>
                <Td>{produto.preco}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* <Button onClick={onCreateProductOpen}>Cadastrar Produto</Button> */}

      {/* <AlertDialog isOpen={isCreateProductOpen} onClose={onCreateProductClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Cadastrar Produto</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <FormProdutos button={<Button>Cadastrar Produto</Button>}/>
            </AlertDialogBody>
            <AlertDialogFooter />
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog> */}

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Efetuar Venda</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormVendas button={<Button width="100%">Efetuar Venda</Button>}/>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </ChakraProvider>
  );
}
