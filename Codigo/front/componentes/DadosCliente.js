import { Container, Input, Grid, GridItem, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import InputMask from 'react-input-mask';

export default function FormCliente({ cliente }) {
    const [formData, setFormData] = useState({
        nome: cliente.nome || '',
        cpf: cliente.cpf || '',
        email: cliente.email || '',
        telefone: cliente.telefone || '',
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: ''
    });

    // Preencher os campos de endereço se existirem
    if (cliente.endereco) {
        const [cep, estado, cidade, bairro, rua, numero] = cliente.endereco.split(',').map(item => item.trim());
        formData.cep = cep || '';
        formData.estado = estado || '';
        formData.cidade = cidade || '';
        formData.bairro = bairro || '';
        formData.rua = rua || '';
        formData.numero = numero || '';
    }

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
                // Limpar o formulário após atualizar
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
                window.location.reload(); // Atualizar a página
            })
            .catch(error => {
                console.error('Erro ao atualizar cliente:', error);
            });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8081/clientes/${cliente.id}`)
            .then(response => {
                console.log('Cliente deletado:', response.data);
                // Limpar o formulário após deletar
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
                window.location.reload(); // Atualizar a página
            })
            .catch(error => {
                console.error('Erro ao deletar cliente:', error);
            });
    };

    const handleCancel = () => {
        // Implementar a lógica desejada ao clicar em cancelar
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

                <Grid marginTop={5} templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem>
                        <Button borderRadius="lg" colorScheme='blue' size='md' onClick={handleCancel} w="full">
                            Cancelar
                        </Button>
                    </GridItem>
                    <GridItem>
                        <Button borderRadius="lg" colorScheme='red' size='md' onClick={handleDelete} w="full">
                            Deletar Cliente
                        </Button>
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
