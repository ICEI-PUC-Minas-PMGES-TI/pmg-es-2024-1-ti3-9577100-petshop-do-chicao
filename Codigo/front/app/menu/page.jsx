"use client";
import React from "react";
import { ChakraProvider, Grid, GridItem, background } from "@chakra-ui/react";
import { Image, Box } from "@chakra-ui/react";
import { Button, ButtonGroup, Stack, HStack, VStack } from "@chakra-ui/react";
import Clientes from "@/componentes/Clientes";



function App() {

  // Obtém a URL atual
  const currentURL = window.location.href;

  // Condição para determinar a cor de fundo do botão
  let bgCaixa = 'white', bgVenda = 'white', bgCliente = 'white', bgEstoque = 'white', bgAgendamento = 'white', bgFuncionario = 'white';
  if (currentURL.includes('caixa')) {
    bgCaixa = 'red'; // Defina a cor de fundo como vermelho se a URL incluir 'pagina1'
  } else if (currentURL.includes('venda')) {
    bgVenda = 'red'; // Defina a cor de fundo como azul se a URL incluir 'pagina2'
  } else if (currentURL.includes('clientes')) {
    bgCliente = 'red'; // Defina a cor de fundo como azul se a URL incluir 'pagina2'
  } else if (currentURL.includes('estoque')) {
    bgEstoque = 'red'; // Defina a cor de fundo como azul se a URL incluir 'pagina2'
  } else if (currentURL.includes('agendamentos')) {
    bgAgendamento = 'red'; // Defina a cor de fundo como azul se a URL incluir 'pagina2'
  } else if (currentURL.includes('funcionario')) {
    bgFuncionario = 'red'; // Defina a cor de fundo como azul se a URL incluir 'pagina2'
  }


  return (
    <ChakraProvider>
      <Grid
        templateAreas={`
                  "nav main"`}
        gridTemplateRows={"100% 100%"}
        gridTemplateColumns={"250px 1fr"}
        h="100%"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="5" area={"nav"} width={300} height={100} position="fixed">
          <Image
            boxSize="200px"
            objectFit="cover"
            src="./Codigo/front/public/logoPet.png"
          />
          <Stack spacing={4} pt={20} align="left" justify-content="left" width={200}>
            <Button id="opCaixa" size="lg" bg={bgCaixa} >
              Caixa
            </Button>
            <Button id="opVendas" size="lg" bg={bgVenda}>
              Vendas
            </Button>
            <Button id="opClientes" size="lg" bg={bgCliente}>
              Clientes
            </Button>
            <Button id="opEstoque" size="lg" bg={bgEstoque}>
              Estoque
            </Button>
            <Button id="opAgendamentos" size="lg" bg={bgAgendamento}>
              Agendamentos
            </Button>
            <Button id="opFuncionarios" size="lg" bg={bgFuncionario}>
              Funcionarios
            </Button>
          </Stack>
        </GridItem>
        <GridItem pl="2" area={"main"} h="auto"></GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
