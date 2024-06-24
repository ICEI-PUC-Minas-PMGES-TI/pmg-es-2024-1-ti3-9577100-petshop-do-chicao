import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Container, Flex, Spacer, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import DadosProduto from './DadosProduto';
import FormProduto from './FormProduto'

export default function Estoque() {
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [isOpenDadosProduto, setIsOpenDadosProduto] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:8081/products');
                setProdutos(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    const handleProdutoClick = (produto) => {
        setProdutoSelecionado(produto);
        setIsOpenDadosProduto(true);
    };

    const handleCloseDadosProduto = () => {
        setProdutoSelecionado(null);
        setIsOpenDadosProduto(false);
    };

    return (
        <Container maxW='auto'>
            <Flex marginBottom='15px'>
                <Spacer />
                <Button colorScheme='red' size='md' borderRadius='lg' onClick={onOpen}>
                    Novo Produto
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
                        <AlertDialogHeader>Cadastro de produto</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <FormProduto />
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialog>
            </Flex>

            <TableContainer border='1px' borderColor='gray.200' borderRadius='lg' padding='10px'>
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>Produto</Th>
                            <Th>Valor de Compra</Th>
                            <Th>Valor de Venda</Th>
                            <Th isNumeric>Quantidade</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {produtos.map((produto, index) => (
                            <Tr key={index} onClick={() => handleProdutoClick(produto)}>
                                <Td width='auto'>{produto.produto_descricao}</Td>
                                <Td width='auto'>R$ {produto.valorcompra}</Td>
                                <Td width='auto'>R$ {produto.preco}</Td>
                                <Td isNumeric width='auto'>{produto.qtde}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={handleCloseDadosProduto}
                isOpen={isOpenDadosProduto}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Dados do Produto</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {produtoSelecionado && <DadosProduto produto={produtoSelecionado} />}
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </Container>
    );
}
