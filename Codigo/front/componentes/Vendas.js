import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Spacer,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  ChakraProvider,
} from "@chakra-ui/react";
import axios from "axios";
import DadosVenda from "./DadosVenda";
import FormVendas from "./FormVendas";
import { theme } from "@/app/theme";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [vendaSelecionada, setVendaSelecionada] = useState(null);
  const [isOpenDadosVenda, setIsOpenDadosVenda] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => handleCancelVenda(),
  });
  const cancelRef = useRef();
  const [idCliente, setIdCliente] = useState("");
  const [tipoPagamento, setTipoPagamento] = useState("");
  const [itensVenda, setItensVenda] = useState([]);
  const [idCaixaAberto, setIdCaixaAberto] = useState(null);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await axios.get("http://localhost:8081/vendas");

        const vendasFormatadas = response.data
          ? response.data.map((venda) => ({
            ...venda,
            dataFormatada: new Date(venda.data).toLocaleDateString(),
            horaFormatada: new Date(venda.data).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            valorFormatado: venda.valortotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }), // Formata o valor total
          }))
          : [];
        setVendas(vendasFormatadas);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      }
    };

    fetchVendas();
  }, []);

  useEffect(() => {
    const fetchCaixaAberto = async () => {
      try {
        const response = await axios.get("http://localhost:8081/caixa/aberto");
        if (response.data.length > 0) {
          const idCaixa = response.data[0].id;
          setIdCaixaAberto(idCaixa);
        } else {
          console.log("Nenhum caixa aberto encontrado.");
          setIdCaixaAberto(null);
        }
      } catch (error) {
        console.error("Erro ao buscar caixa aberto:", error);
        setIdCaixaAberto(null);
      }
    };

    fetchCaixaAberto();
  }, []);

  const handleVendaClick = (venda) => {
    setVendaSelecionada(venda);
    setIsOpenDadosVenda(true);
  };

  const handleCloseDadosVenda = () => {
    setVendaSelecionada(null);
    setIsOpenDadosVenda(false);
  };

  const handleSubmitVenda = async () => {

    const dadosVenda = {
      idcliente: parseInt(idCliente),
      tipopagamento: tipoPagamento,
      itens: itensVenda,
      idcaixa: idCaixaAberto,
    };

    axios
      .post("http://localhost:8081/vendas", dadosVenda)
      .then((response) => {
        console.log("Resposta do backend:", response.data);
        setIdCliente("");
        setTipoPagamento("");
        setItensVenda([]);

        axios
          .put("http://localhost:8081/caixa/atualizarvalortotal")
          .then(() => {
            console.log("Valor total do caixa atualizado com sucesso!");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Erro ao atualizar valor do caixa:", error);
          });

        onClose();
      })
      .catch((error) => {
        console.error("Erro ao enviar formulário:", error);
      });
  };

  const handleCancelVenda = () => {
    setIdCliente("");
    setTipoPagamento("");
    setItensVenda([]);
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex marginBottom="15px">
        <Spacer />
        <Button colorScheme="red" size="md" borderRadius="lg" onClick={onOpen}>
          Efetuar venda
        </Button>
      </Flex>

      <TableContainer
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
        padding="10px"
      >
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Data</Th>
              <Th>Hora</Th>
              <Th>Forma Pagamento</Th>
              <Th isNumeric>Valor Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {vendas.map((venda, index) => (
              <Tr key={index} onClick={() => handleVendaClick(venda)}>
                <Td>{venda.dataFormatada}</Td>
                <Td>{venda.horaFormatada}</Td>
                <Td>{venda.tipopagamento}</Td>
                <Td isNumeric>{venda.valorFormatado}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={handleCloseDadosVenda}
        isOpen={isOpenDadosVenda}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Dados da Venda</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {vendaSelecionada && <DadosVenda venda={vendaSelecionada} />}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader></AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormVendas
              setIdCliente={setIdCliente}
              setTipoPagamento={setTipoPagamento}
              itensVenda={itensVenda}
              setItensVenda={setItensVenda}
              button={
                <Button width="100%" onClick={handleSubmitVenda}>
                  Confirmar venda
                </Button>
              }
            />
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </ChakraProvider>
  );
}
