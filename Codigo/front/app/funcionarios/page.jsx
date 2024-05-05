"use client";

import {
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  Button,
  ChakraProvider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { theme } from "../theme";
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import FormFuncionarios from "@/componentes/FormFuncionarios";
import CadastroFuncionarios from "./cadastro/page";

export default function ListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  useEffect(() => {
    return () => {
      axios
        .get("http://localhost:8081/funcionarios")
        .then(function (response) {
          setFuncionarios(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <InputGroup width="auto">
          <Input placeholder="Pesquisar" />
          <InputRightElement pointerEvents="none">
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <Button onClick={onCreateOpen}>Novo Funcionário</Button>
      </Flex>
      <TableContainer paddingTop="14px">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {funcionarios.map((funcionario) => (
              <Tr
                key={funcionario.id}
                onClick={() => {
                  console.log(funcionario)
                  const [cep, rua, complemento, cidade, bairro ] = funcionario.endereco.split(',').map(item => item.trim());
                  setFuncionarioSelecionado({
                    nome: funcionario.nome,
                    email: funcionario.email,
                    telefone: funcionario.telefone,
                    cpf: funcionario.cpf,
                    senha: funcionario.senha,
                    confirmarSenha: funcionario.senha,
                    cep: cep,
                    estado: estado,
                    cidade: cidade,
                    bairro: bairro,
                    rua: rua,
                    complemento: complemento,
                  });
                  onEditOpen();
                  console.log(funcionarioSelecionado)
                }}
              >
                <Td>{funcionario.nome}</Td>
                <Td>{funcionario.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <AlertDialog isOpen={isCreateOpen} onClose={onCreateClose} isCentered>
        <AlertDialogContent>
          <AlertDialogHeader>Criar Funcionário</AlertDialogHeader>
          <AlertDialogCloseButton />
          <CadastroFuncionarios />
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog isOpen={isEditOpen} onClose={onEditClose} isCentered>
        <AlertDialogContent>
          <AlertDialogHeader>Atualizar Funcionário</AlertDialogHeader>
          <AlertDialogCloseButton />
          <FormFuncionarios
            initialState={{
              nome: "Teste",
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
            }}
          />
        </AlertDialogContent>
      </AlertDialog>
    </ChakraProvider>
  );
}
