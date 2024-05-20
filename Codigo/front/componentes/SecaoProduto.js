import { Input, Select, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export default function SecaoProduto(props) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    return () => {
      axios
        .get("http://localhost:8081/products")
        .then(function (response) {
          setProdutos(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }, []);

  return (
    <SimpleGrid columns="3" spacingX={"4"} spacingY={"2"} paddingBottom={2}>
      <Select placeholder="Produto">
        {produtos.map((produto) => (
          <option key={produto.id}>{produto.produto_descricao}</option>
        ))}
      </Select>
      <NumericFormat
        id={props.produtoId}
        placeholder="Valor"
        defaultValue={0}
        value={props.valorUnitario}
        prefix="R$ "
        customInput={Input}
        // onValueChange={(values, sourceInfo) => {
        //   console.log(values, sourceInfo);
        // }}
        onChange={props.handleValorChange}
      />
      <Input
        placeholder="Quantidade"
        type="number"
        id={props.quantidadeId}
        value={props.quantidade}
        onChange={props.handleChange}
      />
    </SimpleGrid>
  );
}
