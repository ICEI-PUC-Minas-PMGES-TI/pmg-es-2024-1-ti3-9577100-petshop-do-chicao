import React, { useState, useEffect, useRef } from 'react';
import { Container, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Flex, Spacer, AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import DadosVenda from './DadosVenda';

export default function Vendas() {
    const [vendas, setVendas] = useState([]);
    const [vendaSelecionada, setVendaSelecionada] = useState(null);
    const [isOpenDadosVenda, setIsOpenDadosVenda] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    useEffect(() => {
        const fetchVendas = async () => {
            try {
                const response = await axios.get('http://localhost:8081/vendas');

                const vendasFormatadas = response.data.map(venda => ({
                    ...venda,
                    dataFormatada: new Date(venda.data).toLocaleDateString(),
                    horaFormatada: new Date(venda.data).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                    valorFormatado: venda.valortotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) // Formata o valor total
                }));
                setVendas(vendasFormatadas);
            } catch (error) {
                console.error('Erro ao buscar vendas:', error);
            }
        };

        fetchVendas();
    }, []);

    const handleVendaClick = (venda) => {
        setVendaSelecionada(venda);
        setIsOpenDadosVenda(true);
    };

    const handleCloseDadosVenda = () => {
        setVendaSelecionada(null);
        setIsOpenDadosVenda(false);
    };

    return (
        <Container maxW='auto'>
            <Flex marginBottom='15px'>
                <Spacer />
                <Button colorScheme='red' size='md' borderRadius='lg' onClick={onOpen}>
                    Nova Venda
                </Button>
            </Flex>

            <TableContainer border='1px' borderColor='gray.200' borderRadius='lg' padding='10px'>
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>Data</Th>
                            <Th>Hora</Th>
                            <Th>Forma Pagamento</Th>
                            <Th isNumeric>Valor Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {vendas.map((venda, index) => (
                            <Tr key={index} onClick={() => handleVendaClick(venda)}>
                                <Td>{venda.dataFormatada}</Td>
                                <Td>{venda.horaFormatada}</Td>
                                <Td>{venda.tipopagamento}</Td>
                                <Td isNumeric>{venda.valorFormatado}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={handleCloseDadosVenda}
                isOpen={isOpenDadosVenda}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Dados da Venda</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {vendaSelecionada && <DadosVenda venda={vendaSelecionada} />}
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </Container>
    );
}
