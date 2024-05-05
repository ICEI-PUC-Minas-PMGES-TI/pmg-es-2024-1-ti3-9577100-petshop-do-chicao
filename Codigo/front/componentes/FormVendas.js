import { Container, Input, Grid, GridItem, Button } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import InputMask from 'react-input-mask';

export default function FormVendas() {
    const initialState = {
        products: '',
        cliente: '',
        quantidade: '',
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dadosVenda = {
            products: formData.products,
            cliente: formData.cliente,
            quantidade: formData.quantidade,
        };

        axios.post('http://localhost:8081/clientes', dadosCliente)
            .then(response => {
                console.log('Resposta do backend:', response.data);
                setFormData(initialState);
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao enviar formulário:', error);
            });
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Heading marginTop={3} marginBottom={3} as='h5' size='sm'>
                    Produto
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Nome'
                            name='nome'
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </GridItem>
                    <GridItem>
                        <InputMask
                            mask="999.999.999-99"
                            maskChar={null}
                            value={formData.cpf}
                            onChange={handleChange}
                        >
                            {(inputProps) => (
                                <Input
                                    ref={cpfInputRef}
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
                            onChange={handleChange}
                        />
                    </GridItem>
                    <GridItem>
                        <InputMask
                            mask="(99) 99999-9999"
                            maskChar={null}
                            value={formData.telefone}
                            onChange={handleChange}
                        >
                            {(inputProps) => (
                                <Input
                                    ref={telefoneInputRef}
                                    {...inputProps}
                                    borderRadius="lg"
                                    placeholder='Telefone'
                                    name='telefone'
                                />
                            )}
                        </InputMask>
                    </GridItem>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Estado'
                            name='estado'
                            value={formData.estado}
                            onChange={handleChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Cidade'
                            name='cidade'
                            value={formData.cidade}
                            onChange={handleChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Bairro'
                            name='bairro'
                            value={formData.bairro}
                            onChange={handleChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Rua'
                            name='rua'
                            value={formData.rua}
                            onChange={handleChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Número'
                            name='numero'
                            value={formData.numero}
                            onChange={handleChange}
                        />
                    </GridItem>
                </Grid>

                <Grid marginTop={5} marginBottom={5} templateColumns="repeat(1, 1fr)" gap={6}>
                    <GridItem>
                        <Button borderRadius="lg" colorScheme='red' size='md' type="submit" w="full">
                            Efetuar venda
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Container>
    );
}
