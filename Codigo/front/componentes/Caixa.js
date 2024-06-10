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
import ListaVendas from "./ListaVendas";

export default function Caixa() {
  const [caixas, setCaixas] = useState([]);
  const [caixaSelecionado, setCaixaSelecionado] = useState(null);
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

  function handleCaixaClick(caixa) {
    setCaixaSelecionado(caixa);
    onCaixaOpen();
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex marginBottom="15px">
        <InputGroup width="auto">
          <Input placeholder="Pesquisar" />
          <InputRightElement pointerEvents="none">
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <Button onClick={onCreateOpen}>Abrir Caixa</Button>
      </Flex>

      <TableContainer
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
        padding="10px"
      >
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
              <Tr key={caixa.id} onClick={() => handleCaixaClick(caixa)}>
                <Td>{new Date(caixa.dataabertura).toLocaleString()}</Td>
                <Td>{caixa.datafechamento == null ? "" : new Date(caixa.datafechamento).toLocaleString()}</Td>
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
              <ListaVendas caixa={caixaSelecionado} />
            </AlertDialogBody>
            <AlertDialogFooter />
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraProvider>
  );
}
