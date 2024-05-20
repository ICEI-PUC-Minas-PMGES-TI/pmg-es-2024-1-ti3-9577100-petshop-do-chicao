import React, { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Container } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import DadosCliente from './DadosCliente';
import FormCliente from './FormCliente';

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [isOpenDadosCliente, setIsOpenDadosCliente] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:8081/clientes');
                setClientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        fetchClientes();
    }, []);

    const handleClienteClick = (cliente) => {
        setClienteSelecionado(cliente);
        setIsOpenDadosCliente(true);
    };

    const handleCloseDadosCliente = () => {
        setClienteSelecionado(null);
        setIsOpenDadosCliente(false);
    };

    return (
        <Container maxW='auto'>
            <Flex marginBottom='15px'>
                <Flex minWidth='max-content' alignItems='center'>
                    <Input placeholder='Search' borderRight='0px' borderRadius='lg' borderRightRadius='0px' />
                    <IconButton backgroundColor='white' aria-label='Search database' border='1px' borderLeft='0px' borderColor='gray.200' borderRadius='lg' borderLeftRadius='0px' icon={<SearchIcon />} />
                </Flex>
                <Spacer />
                <Button colorScheme='red' size='md' borderRadius='lg' onClick={onOpen}>
                    Novo Cliente
                </Button>

                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader>Cadastro de cliente</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <FormCliente />
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialog>
            </Flex>

            <TableContainer border='1px' borderColor='gray.200' borderRadius='lg' padding='10px'>
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>E-mail</Th>
                            <Th isNumeric>Telefone</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {clientes.map((cliente, index) => (
                            <Tr key={index} onClick={() => handleClienteClick(cliente)}>
                                <Td width='auto'>{cliente.nome}</Td>
                                <Td width='auto'>{cliente.email}</Td>
                                <Td isNumeric width='auto'>{cliente.telefone}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={handleCloseDadosCliente}
                isOpen={isOpenDadosCliente}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Dados do Cliente</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {clienteSelecionado && <DadosCliente cliente={clienteSelecionado} />}
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </Container>
    );
}
