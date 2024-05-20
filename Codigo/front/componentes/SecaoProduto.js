import { Input, Select, SimpleGrid } from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";

export default function SecaoProduto(props) {
  return (
    <SimpleGrid columns="3" spacingX={"4"} spacingY={"2"} paddingBottom={2}>
      <Select placeholder="Selecione um Produto">
        {props.options}
      </Select>
      <NumericFormat
        placeholder="Valor"
        value={props.valorUnitario}
        prefix="R$ "
        customInput={Input}
        onValueChange={(values, sourceInfo) => {
          console.log(values, sourceInfo);
        }}
      />
      <Input
        placeholder="Quantidade"
        type="number"
        id="quantidade"
        value={props.quantidade}
        onChange={props.handleChange}
      />
    </SimpleGrid>
  );
}
