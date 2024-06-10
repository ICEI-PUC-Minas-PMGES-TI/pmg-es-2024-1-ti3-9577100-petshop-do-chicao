import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ChakraProvider,
  InputGroup,
  Input,
  InputRightElement,
  Spacer,
  Button,
  Flex,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import { theme } from "@/app/theme";

export default function Caixa() {
  const [caixas, setCaixas] = useState([]);
  const [vendas, setVendas] = useState([]);
  const cancelRef = useRef();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isCaixaOpen,
    onOpen: onCaixaOpen,
    onClose: onCaixaClose,
  } = useDisclosure();

  useEffect(() => {
    return () => {
      axios
        .get("http://localhost:8081/caixa")
        .then(function (response) {
          setCaixas(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }, []);

  const handleSubmit = (e) => {
    const dados = {
      dataabertura: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    axios
      .post("http://localhost:8081/caixa/abrir", dados)
      .then((response) => {
        console.log("Resposta do backend:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao abrir caixa:", error);
      });
  };

  function handleCaixaClick(id) {
    axios
      .get(`http://localhost:8081/caixa/${id}`)
      .then((response) => {
        console.log(response.data)
        setVendas(response.data)
      })
      .catch((error) => {
        console.error("Erro ao abrir caixa:", error);
      });
    onCaixaOpen();
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <InputGroup width="auto">
          <Input placeholder="Pesquisar" />
          <InputRightElement pointerEvents="none">
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <Button onClick={onCreateOpen}>Abrir Caixa</Button>
      </Flex>

      <TableContainer paddingTop="14px">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Data Abertura</Th>
              <Th>Data Fechamento</Th>
              <Th>Status</Th>
              <Th isNumeric>Valor Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {caixas.map((caixa) => (
              <Tr key={caixa.id} onClick={() => handleCaixaClick(caixa.id)}>
                <Td>{caixa.dataabertura}</Td>
                <Td>{caixa.datafechamento}</Td>
                <Td>{caixa.isopen == 0 ? "Fechado" : "Aberto"}</Td>
                <Td isNumeric>R$ {caixa.valortotal}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <AlertDialog
        isOpen={isCreateOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCreateClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Abrir Caixa</AlertDialogHeader>
            <AlertDialogBody>
              Deseja abrir o caixa no dia atual?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="gray"
                ref={cancelRef}
                onClick={onCreateClose}
              >
                Cancelar
              </Button>
              <Button onClick={handleSubmit} ml={3}>
                Abrir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog isOpen={isCaixaOpen} onClose={onCaixaClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Caixa</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <TableContainer paddingTop="14px">
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>Data</Th>
                      <Th>Forma Pagamento</Th>
                      <Th isNumeric>Valor Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {vendas.length > 0 ? (
                      vendas.map((venda) => (
                        <Tr key={venda.id}>
                          <Td>{venda.id}</Td>
                          <Td>{venda.data}</Td>
                          <Td>{venda.tipopagamento}</Td>
                          <Td isNumeric>R$ {venda.valortotal}</Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan="4" textAlign="center">
                          Nenhum item encontrado
                        </Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </AlertDialogBody>
            <AlertDialogFooter />
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraProvider>
  );
}
