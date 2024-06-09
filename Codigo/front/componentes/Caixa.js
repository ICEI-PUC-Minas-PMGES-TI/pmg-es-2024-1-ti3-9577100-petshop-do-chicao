import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Container, Flex, Spacer, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';

export default function Caixa() {
    const [caixa, setCaixa] = useState([]);
    const cancelRef = React.useRef();

    useEffect(() => {
        const fetchCaixa = async () => {
            try {
                const response = await axios.get('http://localhost:8081/caixa');
                setCaixa(response.data);
            } catch (error) {
                console.error('Erro ao buscar caixa', error);
            }
        };

        fetchCaixa();
    }, []);


    return (
        <Container maxW='auto'>

            <TableContainer border='1px' borderColor='gray.200' borderRadius='lg' padding='10px'>
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Aberto</Th>
                            <Th>Valor Total</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                                <Td width='auto'>{caixa.idcaixa}</Td>
                                <Td width='auto'>{caixa.isopen}</Td>
                                <Td width='auto'>{caixa.valortotal}</Td>
                            </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

        </Container>
    );
}
