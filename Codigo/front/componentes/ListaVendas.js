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

export default function ListaVendas({ caixa }) {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    return () => {
      axios
        .get(`http://localhost:8081/caixa/${caixa.id}`)
        .then((response) => {
          setVendas(response.data);
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
                <Td>{new Date(venda.data).toLocaleString()}</Td>
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
  );
}
