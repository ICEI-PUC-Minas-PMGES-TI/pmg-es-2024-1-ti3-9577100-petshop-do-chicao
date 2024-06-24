import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ListaMovimentacoes({ caixa }) {
  const [movimentacoes, setMovimentacoes] = useState([]);

  useEffect(() => {
    return () => {
      axios
        .get(`http://localhost:8081/caixa/movimentacoes/${caixa.id}`)
        .then((response) => {
          setMovimentacoes(response.data);
        })
        .catch((error) => {
          console.error("Erro ao listar movimentações:", error);
        });
    };
  }, []);

  return (
    <TableContainer paddingTop="14px">
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Descrição</Th>
            <Th>Tipo</Th>
            <Th>Data</Th>
            {/* <Th>Forma Pagamento</Th> */}
            <Th isNumeric>Valor Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {movimentacoes.length > 0 ? (
            movimentacoes.map((movimentacao, index) => (
              <Tr key={index}>
                <Td>{movimentacao.descricao}</Td>
                <Td>{movimentacao.tipo}</Td>
                <Td>{new Date(movimentacao.data).toLocaleString()}</Td>
                {/* <Td>{movimentacao.tipopagamento}</Td> */}
                <Td color={movimentacao.tipo == "Estoque" ? "red" : "green"} fontFamily="bold" isNumeric>
                  {movimentacao.tipo == "Estoque" ? "-" : "+"}R${" "}
                  {movimentacao.valortotal}
                </Td>
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
  );
}
