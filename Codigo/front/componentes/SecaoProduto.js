import { Input, Select, SimpleGrid, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export default function SecaoProduto(props) {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState('');
  const [quantidade, setQuantidade] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8081/products")
      .then(function (response) {
        setProdutos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleAddItem = () => {
    if (!selectedProduto || quantidade <= 0) {
      alert("Por favor, selecione um produto e insira uma quantidade válida.");
      return;
    }

    axios.post("http://localhost:8081/itensVenda", {
      idProduto: selectedProduto,
      quantidade: quantidade,
      idVenda: props.idVenda // Assuming props.idVenda is available in your component
    })
    .then(function (response) {
      // Item successfully added, you can update your UI as needed
      console.log("Item de venda adicionado com sucesso:", response.data);
    })
    .catch(function (error) {
      console.error("Erro ao adicionar item de venda:", error);
      alert("Ocorreu um erro ao adicionar o item de venda. Por favor, tente novamente.");
    });
  };

  return (
    <SimpleGrid columns="3" spacingX={"4"} spacingY={"2"} paddingBottom={2}>
      <Select
        placeholder="Produto"
        value={selectedProduto}
        onChange={(e) => setSelectedProduto(e.target.value)}
      >
        {produtos.map((produto) => (
          <option key={produto.id} value={produto.id}>{produto.produto_descricao}</option>
        ))}
      </Select>
      <Input
        placeholder="Quantidade"
        type="number"
        id={props.quantidadeId}
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />
      <Button onClick={handleAddItem}>Adicionar Item</Button>
    </SimpleGrid>
  );
}
