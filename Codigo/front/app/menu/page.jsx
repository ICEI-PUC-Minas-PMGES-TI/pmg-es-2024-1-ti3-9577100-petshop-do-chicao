'use client'
import React, { useState } from "react";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import { Image, Box } from "@chakra-ui/react";
import { Button, Stack } from "@chakra-ui/react";
import Clientes from "@/componentes/Clientes";
import Pets from "@/app/cadastro_pets/page";
import Funcionarios from "../funcionarios/cadastro/page";

function App() {
  const [currentScreen, setCurrentScreen] = useState("caixa");

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
  };

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
          <Image boxSize="200px" objectFit="cover" src="./logoPet.jpg" />
          <Stack
            spacing={4}
            pt={20}
            align="left"
            justify-content="left"
            width={200}
          >
            <Button
              size="lg"
              bg={currentScreen === "caixa" ? "red" : "white"}
              color="black"
              onClick={() => handleScreenChange("caixa")}
            >
              Caixa
            </Button>
            <Button
              size="lg"
              bg={currentScreen === "vendas" ? "red" : "white"}
              color="black"
              onClick={() => handleScreenChange("vendas")}
            >
              Vendas
            </Button>
            <Button
              size="lg"
              bg={currentScreen === "clientes" ? "red" : "white"}
              color="black"
              onClick={() => handleScreenChange("clientes")}
            >
              Clientes
            </Button>
            <Button
                size="lg"
                bg={currentScreen === "Pets" ? "red" : "white"}
                color="black"
                onClick={() => handleScreenChange("pets")}
            >
              Pets
            </Button>
            <Button
              size="lg"
              bg={currentScreen === "estoque" ? "red" : "white"}
              color="black"
              onClick={() => handleScreenChange("estoque")}
            >
              Estoque
            </Button>
            <Button
              size="lg"
              bg={currentScreen === "agendamentos" ? "red" : "white"}
              color="black"
              onClick={() => handleScreenChange("agendamentos")}
            >
              Agendamentos
            </Button>
            <Button
              size="lg"
              bg={currentScreen === "funcionarios" ? "red" : "white"}
              color="black"
              onClick={() => handleScreenChange("funcionarios")}
            >
              Funcionários
            </Button>
          </Stack>
        </GridItem>
        <GridItem pl="2" area={"main"} h="auto" margin={5}>
          {currentScreen === "caixa" && <Box>Conteúdo da tela de Caixa</Box>}
          {currentScreen === "vendas" && <Box>Conteúdo da tela de Vendas</Box>}
          {currentScreen === "clientes" && <Clientes/>}
          {currentScreen === "pets" && <Pets/>}
          {currentScreen === "estoque" && <Box>Conteúdo da tela de Estoque</Box>}
          {currentScreen === "agendamentos" && <Box>Conteúdo da tela de Agendamentos</Box>}
          {currentScreen === "funcionarios" && <Funcionarios/>}
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
