"use client";
import React, { useState } from "react";
import {
  ChakraProvider,
  Grid,
  GridItem,
  Button,
  Stack,
  extendTheme,
  Box,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
// Paginas //
import Clientes from "@/componentes/Clientes";
import Pets from "@/app/cadastro_pets/page";
import Funcionarios from "../funcionarios/cadastro/page";
import Logo from "@/app/menu/logoPet.jpg";
import Image from "next/image";
import ListaFuncionarios from "../funcionarios/page";
import Agendamentos from "@/componentes/Agendamentos";
import Estoque from "../estoque/page";
import Vendas from "../vendas/page";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "html, body": {
        bg: mode("white", "gray.800")(props),
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          bg: "red", // Define a cor de fundo como transparente no hover
        },
      },
    },
  },
});

function App() {
  const [currentScreen, setCurrentScreen] = useState("caixa");

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <ChakraProvider theme={theme}>
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
            src={Logo}
            alt="Logo"
            width={200}
            height={200}
            style={{
              objectFit: "cover",
            }}
            priority
          />
          <Stack
            spacing={4}
            pt={20}
            align="left"
            justify-content="left"
            width={200}
          >
            <Button
              colorScheme={currentScreen === "caixa" ? "red" : "gray"}
              size="lg"
              bg={currentScreen === "caixa" ? "red" : "white"}
              color={currentScreen === "caixa" ? "white" : "black"}
              onClick={() => handleScreenChange("caixa")}
            >
              Caixa
            </Button>
            <Button
              colorScheme={currentScreen === "vendas" ? "red" : "gray"}
              size="lg"
              bg={currentScreen === "vendas" ? "red" : "white"}
              color={currentScreen === "vendas" ? "white" : "black"}
              onClick={() => handleScreenChange("vendas")}
            >
              Vendas
            </Button>
            <Button
              colorScheme={currentScreen === "clientes" ? "red" : "gray"}
              size="lg"
              bg={currentScreen === "clientes" ? "red" : "white"}
              color={currentScreen === "clientes" ? "white" : "black"}
              onClick={() => handleScreenChange("clientes")}
            >
              Clientes
            </Button>
            <Button
              colorScheme={currentScreen === "pets" ? "red" : "gray"}
              size="lg"
              bg={currentScreen === "pets" ? "red" : "white"}
              color={currentScreen === "pets" ? "white" : "black"}
              onClick={() => handleScreenChange("pets")}
            >
              Pets
            </Button>
            <Button
              colorScheme={currentScreen === "estoque" ? "red" : "gray"}
              size="lg"
              bg={currentScreen === "estoque" ? "red" : "white"}
              color={currentScreen === "estoque" ? "white" : "black"}
              onClick={() => handleScreenChange("estoque")}
            >
              Estoque
            </Button>
            <Button
              colorScheme={currentScreen === "agendamentos" ? "red" : "gray"}
              size="lg"
              bg={currentScreen === "agendamentos" ? "red" : "white"}
              color={currentScreen === "agendamentos" ? "white" : "black"}
              onClick={() => handleScreenChange("agendamentos")}
            >
              Agendamentos
            </Button>
            <Button
              colorScheme={currentScreen === "funcionarios" ? "red" : "gray"}
              size="lg"
              bg={currentScreen === "funcionarios" ? "red" : "white"}
              color={currentScreen === "funcionarios" ? "white" : "black"}
              onClick={() => handleScreenChange("funcionarios")}
            >
              Funcionários
            </Button>
          </Stack>
        </GridItem>
        <GridItem pl="2" area={"main"} h="auto" margin={5}>
          {currentScreen === "caixa" && <Box>Conteúdo da tela de Caixa</Box>}
          {currentScreen === "vendas" && <Vendas />}
          {currentScreen === "clientes" && <Clientes />}
          {currentScreen === "pets" && <Pets />}
          {currentScreen === "estoque" && <Estoque />}
          {currentScreen === "agendamentos" && <Agendamentos />}
          {currentScreen === "funcionarios" && <ListaFuncionarios />}
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;