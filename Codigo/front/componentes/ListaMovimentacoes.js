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
      const movs = [];
      axios
        .get(`http://localhost:8081/caixa/vendas/${caixa.id}`)
        .then((response) => {
          response.data.map((mov) =>
            movs.push({
              tipo: "Venda",
              valortotal: mov.valortotal,
              descricao: mov.tipopagamento,
              data: mov.data,
            })
          );
        })
        .catch((error) => {
          console.error("Erro ao abrir caixa:", error);
        });
      axios
        .get(`http://localhost:8081/caixa/produtos/${caixa.id}`)
        .then((response) => {
          response.data.map((mov) =>
            movs.push({
              tipo: "Estoque",
              valortotal: mov.preco * mov.qtde,
              descricao: mov.produto_descricao,
              data: mov.data,
            })
          );
          setMovimentacoes(movs);
        })
        .catch((error) => {
          console.error("Erro ao abrir caixa:", error);
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
                <Td isNumeric>
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
