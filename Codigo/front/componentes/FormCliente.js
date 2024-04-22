import { Container, Input, Grid, GridItem, Button } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { Heading } from '@chakra-ui/react';
import axios from 'axios';
import InputMask from 'react-input-mask';

export default function FormCliente() {
    const initialState = {
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
    };

    const [formData, setFormData] = useState(initialState);
    const cpfInputRef = useRef(null);
    const telefoneInputRef = useRef(null);
    const cepInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCEPChange = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        setFormData({
            ...formData,
            cep: cep
        });

        if (cep.length === 8) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    const { data } = response;
                    setFormData({
                        ...formData,
                        estado: data.uf,
                        cidade: data.localidade,
                        bairro: data.bairro,
                        rua: data.logradouro
                    });
                })
                .catch(error => {
                    console.error('Erro ao buscar CEP:', error);
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const endereco = `${formData.cep}, ${formData.rua}, ${formData.numero}, ${formData.bairro}, ${formData.cidade}, ${formData.estado}`;

        const dadosCliente = {
            nome: formData.nome,
            cpf: formData.cpf,
            email: formData.email,
            telefone: formData.telefone,
            endereco: endereco
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
                    Dados Pessoais
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

                <Heading marginTop={3} marginBottom={3} as='h5' size='sm'>
                    Endereço
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <InputMask
                            mask="99999-999"
                            maskChar={null}
                            value={formData.cep}
                            onChange={handleCEPChange}
                        >
                            {(inputProps) => (
                                <Input
                                    ref={cepInputRef}
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
                            Criar Cliente
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Container>
    );
}
