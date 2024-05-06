"use client";

import { theme } from "@/app/theme";
import FormFuncionarios from "@/componentes/FormFuncionarios";
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function populateInitialState(id) {
  axios
    .get(`http://localhost:8081/funcionarios/${id}`)
    .then(function (response) {
      console.log("certo", response);
      const funcionario = response.data;
      console.log(funcionario);
      return {
        nome: funcionario.nome,
        email: funcionario.email,
        telefone: funcionario.telefone,
        cpf: funcionario.cpf,
        senha: funcionario.senha,
        confirmarSenha: funcionario.senha,
        cep: funcionario.cep,
        estado: funcionario.estado,
        cidade: funcionario.cidade,
        bairro: funcionario.bairro,
        rua: funcionario.rua,
        complemento: funcionario.complemento,
      };
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function AtualizaFuncionários({ params }) {
  const [initialState, setInitialState] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    complemento: "",
  });

  // const initialState = {
  //   nome: funcionario.nome,
  //   email: funcionario.email,
  //   telefone: funcionario.telefone,
  //   cpf: funcionario.cpf,
  //   senha: funcionario.senha,
  //   confirmarSenha: funcionario.senha,
  //   cep: funcionario.cep,
  //   estado: funcionario.estado,
  //   cidade: funcionario.cidade,
  //   bairro: funcionario.bairro,
  //   rua: funcionario.rua,
  //   complemento: funcionario.complemento,
  // };

  useEffect(() => {
    return () => {
      axios
        .get(`http://localhost:8081/funcionarios/${params.id}`)
        .then(function (response) {
          console.log("certo", response);
          const funcionario = response.data;
          console.log("funcionario", funcionario);
          const teste = {
            nome: funcionario.nome,
            email: funcionario.email,
            telefone: funcionario.telefone,
            cpf: funcionario.cpf,
            senha: funcionario.senha,
            confirmarSenha: funcionario.senha,
            cep: funcionario.cep,
            estado: funcionario.estado,
            cidade: funcionario.cidade,
            bairro: funcionario.bairro,
            rua: funcionario.rua,
            complemento: funcionario.complemento,
          };
          console.log("teste", teste);
          setInitialState({
            ...initialState,
            nome: funcionario.nome,
            email: funcionario.email,
            telefone: funcionario.telefone,
            cpf: funcionario.cpf,
            senha: funcionario.senha,
            confirmarSenha: funcionario.senha,
            cep: funcionario.cep,
            estado: funcionario.estado,
            cidade: funcionario.cidade,
            bairro: funcionario.bairro,
            rua: funcionario.rua,
            complemento: funcionario.complemento,
          });
          console.log("initial", initialState);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Center height="100vh">
        <Box>
          <FormFuncionarios initialState={initialState} />
          <SimpleGrid columns="2" spacingX={"4"} paddingTop={"4"}>
            <Button variant="outline">Remover</Button>
            <Button>Atualizar</Button>
          </SimpleGrid>
          {initialState.nome}
        </Box>
      </Center>
    </ChakraProvider>
  );
}
