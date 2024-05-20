'use client'

import React, { useState, useEffect } from 'react';
import { Container, Input, Grid, GridItem, Text } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, Button, Flex, Spacer, AlertDialog, AlertDialogBody, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, useDisclosure } from '@chakra-ui/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@chakra-ui/react'

export default function DadosVenda({ venda }) {
    const [itens, setItens] = useState([]);
    const [formData, setFormData] = useState({
        data: '',
        hora: '',
        valorTotal: '',
        tipoPagamento: ''
    });

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const response = await axios.get('http://localhost:8081/itensvenda');

                const itensFormatados = response.data.map(item => ({
                    id: item.id,
                    quantidade: item.qtde,
                    valorUnitario: item.valorunitario
                }));
                setItens(itensFormatados);
            } catch (error) {
                console.error('Erro ao buscar Itens:', error);
            }
        };

        fetchItens();
    }, []);

    useEffect(() => {
        if (venda) {
            const dataObj = new Date(venda.data);
            const dataFormatada = `${dataObj.getDate()}/${dataObj.getMonth() + 1}/${dataObj.getFullYear()}`;
            const horaFormatada = `${dataObj.getHours()}:${dataObj.getMinutes().toString().padStart(2, '0')}`;
            setFormData({
                data: dataFormatada || '',
                hora: horaFormatada || '',
                valorTotal: venda.valortotal || '',
                tipoPagamento: venda.tipopagamento || ''
            });
        }
    }, [venda]);

    return (
        <Container>
            <Breadcrumb>
                <BreadcrumbItem>
                    <h1>{formData.data}</h1>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <h1>{formData.hora}</h1>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <h1>R$ {formData.valorTotal}</h1>
                </BreadcrumbItem>
            </Breadcrumb>

            <TableContainer border='1px' borderColor='gray.200' borderRadius='lg' padding='10px'>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>id</Th>
                            <Th>Nome</Th>
                            <Th isNumeric>Valor Uni</Th>
                            <Th isNumeric>Quantidade</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                            <Tr>
                                <Td>xxxx</Td>
                                <Td>xxxx</Td>
                                <Td>xxxx</Td>
                                <Td>xxxx</Td>
                            </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}
