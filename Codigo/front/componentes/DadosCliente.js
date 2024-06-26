import React, { useState, useEffect } from 'react';
import { Container, Input, Grid, GridItem, Button } from '@chakra-ui/react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { Heading } from '@chakra-ui/react';
import DeleteButton from './DeleteButton';
import data from "@/app/cadastro_pets/Racas.json";

export default function DadosCliente({ cliente }) {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: ''
    });

    useEffect(() => {
        if (cliente) {
            const [cep, estado, cidade, bairro, rua, numero] = cliente.endereco.split(',').map(item => item.trim());
            setFormData({
                nome: cliente.nome || '',
                cpf: cliente.cpf || '',
                email: cliente.email || '',
                telefone: cliente.telefone || '',
                cep: cep || '',
                estado: estado || '',
                cidade: cidade || '',
                bairro: bairro || '',
                rua: rua || '',
                numero: numero || ''
            });
        } else {
            clearForm();
        }
    }, [cliente]);

    const clearForm = () => {
        setFormData({
            nome: '',
            cpf: '',
            email: '',
            telefone: '',
            cep: '',
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: ''
        });
    };

    const handleDadosPessoaisChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEnderecoChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const enderecoString = `${formData.cep}, ${formData.estado}, ${formData.cidade}, ${formData.bairro}, ${formData.rua}, ${formData.numero}`;

        const dadosCliente = {
            nome: formData.nome,
            cpf: formData.cpf,
            email: formData.email,
            telefone: formData.telefone,
            endereco: enderecoString
        };

        axios.put(`http://localhost:8081/clientes/${cliente.id}`, dadosCliente)
            .then(response => {
                console.log('Cliente atualizado:', response.data);
                clearForm();
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao atualizar cliente:', error);
            });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8081/clientes/${cliente.id}`)
            .then(response => {
                console.log('Cliente deletado:', response.data);
                clearForm();
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao deletar cliente:', error);
            });
    };

    const handleCancel = () => {
        console.log('Operação cancelada');
    };

    return (
        <Container>
            <form onSubmit={handleUpdate}>
                <Heading marginTop={3} marginBottom={3} as='h5' size='sm'>
                    Dados Pessoais
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Nome'
                            name='nome'
                            value={formData.nome}
                            onChange={handleDadosPessoaisChange}
                        />
                    </GridItem>
                    <GridItem>
                        <InputMask
                            mask="999.999.999-99"
                            maskChar={null}
                            value={formData.cpf}
                            onChange={handleDadosPessoaisChange}
                        >
                            {(inputProps) => (
                                <Input
                                    {...inputProps}
                                    borderRadius="lg"
                                    placeholder='CPF'
                                    name='cpf'
                                />
                            )}
                        </InputMask>
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='E-mail'
                            name='email'
                            value={formData.email}
                            onChange={handleDadosPessoaisChange}
                        />
                    </GridItem>
                    <GridItem>
                        <InputMask
                            mask="(99) 99999-9999"
                            maskChar={null}
                            value={formData.telefone}
                            onChange={handleDadosPessoaisChange}
                        >
                            {(inputProps) => (
                                <Input
                                    {...inputProps}
                                    borderRadius="lg"
                                    placeholder='Telefone'
                                    name='telefone'
                                />
                            )}
                        </InputMask>
                    </GridItem>
                </Grid>

                <Heading marginTop={3} marginBottom={3} as='h5' size='sm'>
                    Endereço
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <InputMask
                            mask="99999-999"
                            maskChar={null}
                            value={formData.cep}
                            onChange={handleEnderecoChange}
                        >
                            {(inputProps) => (
                                <Input
                                    {...inputProps}
                                    borderRadius="lg"
                                    placeholder='CEP'
                                    name='cep'
                                />
                            )}
                        </InputMask>
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Estado'
                            name='estado'
                            value={formData.estado}
                            onChange={handleEnderecoChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Cidade'
                            name='cidade'
                            value={formData.cidade}
                            onChange={handleEnderecoChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Bairro'
                            name='bairro'
                            value={formData.bairro}
                            onChange={handleEnderecoChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Rua'
                            name='rua'
                            value={formData.rua}
                            onChange={handleEnderecoChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Número'
                            name='numero'
                            value={formData.numero}
                            onChange={handleEnderecoChange}
                        />
                    </GridItem>
                </Grid>

                <Grid marginTop={5} marginBottom={5} templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <DeleteButton cliente={cliente} limparFormulario={clearForm} handleDelete={handleDelete} />
                    </GridItem>
                    <GridItem>
                        <Button borderRadius="lg" colorScheme='green' size='md' type="submit" w="full">
                            Atualizar Cliente
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Container>
    );
}
