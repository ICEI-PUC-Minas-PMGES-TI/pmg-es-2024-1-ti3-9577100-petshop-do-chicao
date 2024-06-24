import React, { useState, useEffect } from "react";
import {
  Container,
  Input,
  Grid,
  GridItem,
  Button,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import DeleteButton from "./DeleteButton";

export default function DadosProduto({ produto }) {
  const [formData, setFormData] = useState({
    id: "",
    produto_descricao: "",
    preco: "",
    valorcompra: "",
    qtde: "",
  });

  useEffect(() => {
    if (produto) {
      setFormData({
        id: produto.id || "",
        produto_descricao: produto.produto_descricao || "",
        preco: produto.preco || "",
        valorcompra: produto.valorcompra || "",
        qtde: produto.qtde || "",
        qtdecompra: produto.qtdecompra || "",
      });
    } else {
      clearForm();
    }
  }, [produto]);

  const clearForm = () => {
    setFormData({
      id: "",
      produto_descricao: "",
      preco: "",
      valorcompra: "",
      qtde: "",
      qtdecompra: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("produto", produto);

    const dadosProduto = {
      id: formData.id,
      produto_descricao: formData.produto_descricao,
      preco: formData.preco,
      qtde: formData.qtde,
      qtdecompra: formData.qtdecompra,
      valorcompra: formData.valorcompra,
      valortotalcompra: formData.valorcompra * formData.qtdecompra,
    };

    axios
      .put(`http://localhost:8081/products/${produto.id}`, dadosProduto)
      .then((response) => {
        console.log("Produto atualizado:", response.data);
        clearForm();
        window.location.reload(); // Recarregar a página após a atualização
      })
      .catch((error) => {
        console.error("Erro ao atualizar produto:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8081/products/${produto.id}`)
      .then((response) => {
        console.log("Produto deletado:", response.data);
        clearForm();
        window.location.reload(); // Recarregar a página após a exclusão
      })
      .catch((error) => {
        console.error("Erro ao deletar produto:", error);
      });
  };

  return (
    <Container>
      <form onSubmit={handleUpdate}>
        <GridItem>
          <Heading marginTop={3} marginBottom={3} as="h5" size="sm">
            Descrição:
          </Heading>
          <Input
            borderRadius="lg"
            placeholder="Descrição"
            name="produto_descricao"
            value={formData.produto_descricao}
            onChange={handleInputChange}
          />
        </GridItem>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <Heading marginTop={3} marginBottom={3} as="h5" size="sm">
              Valor de Compra:
            </Heading>
            <Input
              borderRadius="lg"
              placeholder="Valor de Compra"
              name="valorcompra"
              value={formData.valorcompra}
              onChange={handleInputChange}
            />
          </GridItem>
          <GridItem>
            <Heading marginTop={3} marginBottom={3} as="h5" size="sm">
              Quantidade Compra:
            </Heading>
            <Input
              borderRadius="lg"
              placeholder="Quantidade de Compra"
              name="qtdecompra"
              value={formData.qtdecompra}
              onChange={handleInputChange}
            />
          </GridItem>
          <GridItem>
            <Heading marginTop={3} marginBottom={3} as="h5" size="sm">
              Valor de Venda:
            </Heading>
            <Input
              borderRadius="lg"
              placeholder="Valor de Venda"
              name="preco"
              value={formData.preco}
              onChange={handleInputChange}
            />
          </GridItem>
          <GridItem>
            <Heading marginTop={3} marginBottom={3} as="h5" size="sm">
              Quantidade Venda:
            </Heading>
            <Input
              borderRadius="lg"
              placeholder="Quantidade de Venda"
              name="qtde"
              value={formData.qtde}
              onChange={handleInputChange}
            />
          </GridItem>
        </Grid>

        <Grid
          marginTop={5}
          marginBottom={5}
          templateColumns="repeat(2, 1fr)"
          gap={6}
        >
          <GridItem>
            <DeleteButton
              produto={produto}
              limparFormulario={clearForm}
              handleDelete={handleDelete}
            />
          </GridItem>
          <GridItem>
            <Button
              borderRadius="lg"
              colorScheme="green"
              size="md"
              type="submit"
              w="full"
            >
              Atualizar produto
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Container>
  );
}
