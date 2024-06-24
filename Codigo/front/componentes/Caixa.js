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
  Text,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { theme } from "@/app/theme";
import ListaMovimentacoes from "./ListaMovimentacoes";

export default function Caixa() {
  const [saldo, setSaldo] = useState(0);
  const [caixaAberto, setCaixaAberto] = useState(null);
  const [caixas, setCaixas] = useState([]);
  const [caixaSelecionado, setCaixaSelecionado] = useState(null);
  const cancelRef = useRef();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isCloseCashierOpen,
    onOpen: onCloseCashierOpen,
    onClose: onCloseCashierClose,
  } = useDisclosure();
  const {
    isOpen: isCaixaOpen,
    onOpen: onCaixaOpen,
    onClose: onCaixaClose,
  } = useDisclosure();

  useEffect(() => {
    return () => {
      axios
        .get("http://localhost:8081/caixa/aberto")
        .then(function (response) {
          response.data.length > 0
            ? setCaixaAberto(true)
            : setCaixaAberto(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("http://localhost:8081/caixa")
        .then(function (response) {
          setCaixas(response.data.reverse());
          setSaldo(
            response.data.reduce((acc, cur) => acc + cur["valortotal"], 0)
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }, []);

  function handleOpenCashier() {
    axios
      .post("http://localhost:8081/caixa/abrir")
      .then((response) => {
        console.log("Resposta do backend:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao abrir caixa:", error);
      });
  }

  function handleCloseCashier() {
    axios
      .put("http://localhost:8081/caixa/fechar")
      .then((response) => {
        console.log("Resposta do backend:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao abrir caixa:", error);
      });
  }

  function handleCaixaClick(caixa) {
    setCaixaSelecionado(caixa);
    onCaixaOpen();
  }

  function ButtonCondition({ isOpen }) {
    if (isOpen == null) return;
    if (isOpen) {
      return (
        <Button onClick={onCloseCashierOpen} variant="outline">
          Fechar Caixa
        </Button>
      );
    }
    return <Button onClick={onCreateOpen}>Abrir Caixa</Button>;
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex marginBottom="15px">
        <Center>
          <Text fontSize="md" fontWeight="bold">
            Saldo Atual:
          </Text>
          <Text marginLeft={2} color={saldo >= 0 ? "green" : "red"}>
            {saldo < 0 ? "-" : ""}R$ {Math.abs(saldo)}
          </Text>
        </Center>
        <Spacer />
        <ButtonCondition isOpen={caixaAberto} />
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
                <Td>
                  {caixa.datafechamento == null
                    ? ""
                    : new Date(caixa.datafechamento).toLocaleString()}
                </Td>
                <Td>{caixa.isopen == 0 ? "Fechado" : "Aberto"}</Td>
                <Td color={caixa.valortotal >= 0 ? "green" : "red"} isNumeric>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(caixa.valortotal)}
                </Td>
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
              <Button onClick={handleOpenCashier} ml={3}>
                Abrir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isCloseCashierOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseCashierClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Fechar Caixa</AlertDialogHeader>
            <AlertDialogBody>Deseja fechar o caixa aberto?</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="gray"
                ref={cancelRef}
                onClick={onCloseCashierClose}
              >
                Cancelar
              </Button>
              <Button onClick={handleCloseCashier} ml={3}>
                Fechar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isCaixaOpen}
        onClose={onCaixaClose}
        size="3xl"
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              Dados do Caixa -{" "}
              {caixaSelecionado != null
                ? new Date(caixaSelecionado.dataabertura).toLocaleDateString()
                : ""}
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <ListaMovimentacoes caixa={caixaSelecionado} />
            </AlertDialogBody>
            <AlertDialogFooter />
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraProvider>
  );
}
