import { Container, Input, Grid, GridItem, Button, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

export default function FormProduto() {
    const initialState = {
        produto_descricao: '',
        preco: '',
        qtde: ''
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

        const dadosProduto = {
            produto_descricao: formData.produto_descricao,
            preco: formData.preco,
            qtde: formData.qtde
        };

        axios.post('http://localhost:8081/products', dadosProduto)
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
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <Heading marginTop={3} marginBottom={3} as='h5' size='sm'>
                            Descrição:
                        </Heading>
                        <Input
                            borderRadius="lg"
                            placeholder='Descrição'
                            name='produto_descricao'
                            value={formData.produto_descricao}
                            onChange={handleChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Heading marginTop={3} marginBottom={3} as='h5' size='sm'>
                            Preço:
                        </Heading>
                        <Input
                            borderRadius="lg"
                            placeholder='Preço'
                            name='preco'
                            value={formData.preco}
                            onChange={handleChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Heading marginTop={3} marginBottom={3} as='h5' size='sm'>
                            Quantidade:
                        </Heading>
                        <Input
                            borderRadius="lg"
                            placeholder='Quantidade'
                            name='qtde'
                            value={formData.qtde}
                            onChange={handleChange}
                        />
                    </GridItem>
                </Grid>

                <Grid marginTop={5} marginBottom={5} templateColumns="repeat(1, 1fr)" gap={6}>
                    <GridItem>
                        <Button borderRadius="lg" colorScheme='red' size='md' type="submit" w="full">
                            Criar Produto
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Container>
    );
}
