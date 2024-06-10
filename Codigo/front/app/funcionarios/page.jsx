"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ChakraProvider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
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
import { useEffect, useRef, useState } from "react";
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
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();

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

  const handleUpdate = (e) => {
    const endereco = `${document.getElementById("cep").value}, ${
      document.getElementById("rua").value
    }, ${document.getElementById("complemento").value}, ${
      document.getElementById("bairro").value
    }, ${document.getElementById("cidade").value}, ${
      document.getElementById("estado").value
    }`;

    const dadosFuncionario = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      senha: document.getElementById("senha").value,
      cpf: document.getElementById("cpf").value,
      endereco: endereco,
    };

    axios
      .put(
        `http://localhost:8081/funcionarios/${funcionarioSelecionado.id}`,
        dadosFuncionario
      )
      .then((response) => {
        console.log("Resposta do backend:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao enviar formulário:", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8081/funcionarios/${funcionarioSelecionado.id}`)
      .then((response) => {
        console.log("Resposta do backend:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao enviar formulário:", error);
      });
  };

  const handleFuncionarioClick = (funcionario) => {
    const [cep, rua, complemento, cidade, bairro, estado] = funcionario.endereco
      .split(",")
      .map((item) => item.trim());
    setFuncionarioSelecionado({
      id: funcionario.id,
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
      complemento: complemento == "undefined" ? "" : complemento,
    });
    onEditOpen();
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex marginBottom="15px">
        <InputGroup width="auto">
          <Input placeholder="Pesquisar" />
          <InputRightElement pointerEvents="none">
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
        <Spacer />
        <Button onClick={onCreateOpen}>Novo Funcionário</Button>
      </Flex>
      <TableContainer
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
        padding="10px"
      >
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
                onClick={() => handleFuncionarioClick(funcionario)}
              >
                <Td>{funcionario.nome}</Td>
                <Td>{funcionario.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <AlertDialog isOpen={isCreateOpen} onClose={onCreateClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Criar Funcionário</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <CadastroFuncionarios />
            </AlertDialogBody>
            <AlertDialogFooter />
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog isOpen={isEditOpen} onClose={onEditClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Atualizar Funcionário</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <FormFuncionarios
                initialState={funcionarioSelecionado}
                button={
                  <SimpleGrid columns="2" spacingX={"4"}>
                    <Button
                      width="100%"
                      variant="outline"
                      onClick={onDeleteOpen}
                    >
                      Remover
                    </Button>
                    <Button width="100%" type="submit" onClick={handleUpdate}>
                      Atualizar
                    </Button>
                  </SimpleGrid>
                }
              />
            </AlertDialogBody>
            <AlertDialogFooter />
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Excluír funcionário</AlertDialogHeader>
            <AlertDialogBody>
              Tem certeza? Esta ação não pode ser desfeita.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button variant="outline" ref={cancelRef} onClick={onDeleteClose}>
                Cancelar
              </Button>
              <Button onClick={handleDelete} ml={3}>
                Excluír
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraProvider>
  );
}
