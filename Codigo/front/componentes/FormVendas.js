import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  DarkMode,
  FormControl,
  Grid,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import SecaoProduto from "./SecaoProduto";

export default function FormVendas(props) {
  const [secaoProdutos, setSecaoProdutos] = useState([
    <SecaoProduto key={0} />,
  ]);

  const [form, setForm] = useState(
    props.initialState == undefined ? "" : props.initialState
  );

  function handleAdicionarProduto() {
    setSecaoProdutos(
      secaoProdutos.concat(<SecaoProduto key={secaoProdutos.length} />)
    );
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  return (
    <FormControl>
      <Grid
        templateAreas={`"headerProdutos"
                        "produtos"
                        "headerTotal"
                        "total"
                        "button"`}
        gap={"2"}
      >
        <GridItem area={"headerProdutos"}>
          <Text fontSize="sm" fontWeight="bold">
            Seleção de Produtos
          </Text>
        </GridItem>
        <GridItem area={"produtos"}>
          {secaoProdutos}
          <DarkMode>
            <Button
              colorScheme="green"
              leftIcon={<AddIcon />}
              onClick={handleAdicionarProduto}
            >
              Adicionar Produto
            </Button>
          </DarkMode>
        </GridItem>
        <GridItem area={"headerTotal"}>
          <Text fontSize="sm" fontWeight="bold">
            Total
          </Text>
        </GridItem>
        <GridItem area={"total"}>
          <SimpleGrid columns="2" spacingX={"4"} spacingY={"2"}>
            <Select placeholder="Tipo de Pagamento">
              <option>Cartão de Crédito</option>
              <option>Cartão de Débito</option>
              <option>Dinheiro</option>
            </Select>
            <NumericFormat
              placeholder="Valor Total"
              value={form.valorTotal}
              prefix="R$ "
              customInput={Input}
              onValueChange={(values, sourceInfo) => {
                console.log(values, sourceInfo);
              }}
            />
          </SimpleGrid>
        </GridItem>
        <GridItem area={"button"} paddingTop="2">
          {props.button}
        </GridItem>
      </Grid>
    </FormControl>
  );
}
