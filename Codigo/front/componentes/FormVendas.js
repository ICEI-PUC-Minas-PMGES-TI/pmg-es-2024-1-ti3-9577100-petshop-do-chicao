import { Container, Input, Grid, GridItem, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { Heading } from '@chakra-ui/react';
import axios from 'axios';

export default function FormVendas() {
    const initialState = {
        products: '',
        cliente: '',
        quantidade: '',
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { produto, quantiade } = e.target;
        setFormData({
            ...formData,
            [produto]: value
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
                            placeholder='Produto'
                            name='produto'
                            value={formData.produto}
                            onChange={handleChange}
                        />
                    </GridItem>
                    <GridItem>
                    <NumberInput size='sm' defaultValue={1} min={1} onChange={handleChange} value={formData.quantidade}>
  <NumberInputField focusBorderColor='red.200' />
  <NumberInputStepper>
    <NumberIncrementStepper
      bg='green.200'
      _active={{ bg: 'green.300' }}
      children='+'
    />
    <NumberDecrementStepper
      bg='pink.200'
      _active={{ bg: 'pink.300' }}
      children='-'
    />
  </NumberInputStepper>
</NumberInput>
{/*                         <NumberInput
                            borderRadius="lg"
                            placeholder='Quantidade'
                            name='quantidade'
                            value={formData.quantidade}
                            onChange={handleChange}
                        /> */}

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
