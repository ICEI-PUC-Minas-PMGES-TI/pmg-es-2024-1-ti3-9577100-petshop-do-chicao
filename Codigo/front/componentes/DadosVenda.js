'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, Container, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react'

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
            if (venda && venda.id) {
                try {
                    const response = await axios.get(`http://localhost:8081/itensvenda/${venda.id}`);
                    console.log('API response data:', response.data);

                    const itensFormatados = response.data.map(item => ({
                        id: item.item_id,
                        descricao: item.produto_descricao,
                        quantidade: item.qtde,
                        valorUnitario: item.preco
                    }));
                    console.log('Formatted items:', itensFormatados);
                    setItens(itensFormatados);
                } catch (error) {
                    console.error('Erro ao buscar Itens:', error);
                }
            }
        };

        fetchItens();
    }, [venda]);

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

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    };

    return (
        <Container>

            <Grid margin={3} templateColumns='repeat(3, 1fr)' gap={6}>
                <GridItem>
                    <Text fontSize="md" fontWeight="bold">{formData.data}</Text>
                </GridItem>
                <GridItem>
                    <Text fontSize="md" fontWeight="bold">{formData.hora}</Text>
                </GridItem>
                <GridItem>
                    <Text fontSize="md" fontWeight="bold">Total: R${formData.valorTotal}</Text>
                </GridItem>
            </Grid>

            <TableContainer marginTop={5} marginBottom={5} border='1px' borderColor='gray.200' borderRadius='lg'>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Nome</Th>
                            <Th isNumeric>Valor Uni</Th>
                            <Th isNumeric>Quantidade</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {itens.length > 0 ? (
                            itens.map(item => (
                                <Tr key={item.id}>
                                    <Td>{item.id}</Td>
                                    <Td>{truncateDescription(item.descricao, 8)}</Td>
                                    <Td isNumeric>R$ {item.valorUnitario}</Td>
                                    <Td isNumeric>{item.quantidade}</Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan="4" textAlign="center">Nenhum item encontrado</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Container>
    );
}
