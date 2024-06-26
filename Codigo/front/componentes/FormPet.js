import {Container, Input, Grid, GridItem, Button, Stack, Select, Textarea} from '@chakra-ui/react';
import React, {useState, useRef, useEffect} from 'react';
import { Heading } from '@chakra-ui/react';
import axios, {options} from 'axios';
import InputMask from 'react-input-mask';
import data from "@/app/cadastro_pets/Racas.json";

export default function FormPets() {
    const initialState = {
        nome: '',
        raca: '',
        temperamento: '',
        idade: '',
        observacoes: 'x',
        tutor: ''
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

        const dadosPet = {
            nome: formData.nome,
            raca: formData.raca,
            temperamento: formData.temperamento,
            idade: formData.idade,
            observacoes: formData.observacoes,
            tutor: formData.tutor
        };

        axios.post('http://localhost:8081/pets', dadosPet)
            .then(response => {
                console.log('Resposta do backend:', response.data);
                alert(response.data.message);
                setFormData(initialState);
            })
            .catch(error => {
                alert('Erro ao enviar formulário:')
                console.error('Erro ao enviar formulário', error);
            });
    };

    const [racas, setRacas] = useState([]);

    useEffect(() => {
        async function loadRacas() {
            const data = require('../app/cadastro_pets/Racas.json');
            console.log(data);
            setRacas(data);
        }

        loadRacas();
    }, []);
    const [tutores, setTutores] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:8081/clientes");
            const tutoresData = response.data.map((cliente) => ({
                value: cliente.id,
                label: cliente.nome,
            }));
            setTutores(tutoresData);
        }

        fetchData();
    }, []);

    return (
        <Container>
            <Heading pb={10} pt={10} fontSize={40} textAlign={'center'}>
                 Cadastro de Pets
            </Heading>
            <form onSubmit={handleSubmit}>
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
                        <Select
                            borderRadius="lg"
                            placeholder='Raça'
                            name='raca'
                            value={formData.raca}
                            onChange={handleChange}
                        >
                            {racas.map((option) => (
                                <option key={option.id} value={option.value}>
                                    {option.value}
                                </option>
                            ))}
                        </Select>
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Idade'
                            name='idade'
                            value={formData.idade}
                            onChange={handleChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Select
                            borderRadius="lg"
                            placeholder='Temperamento'
                            name='temperamento'
                            value={formData.temperamento}
                            onChange={handleChange}
                        >
                            <option value='Tranquilo'>Tranquilo</option>
                            <option value='Moderado'>Moderado</option>
                            <option value='Agitado'>Agitado</option>

                        </Select>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Input
                            borderRadius="lg"
                            placeholder='Observações'
                            name="Observacoes"
                            value={formData.observacoes}
                            onChange={handleChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Select
                            borderRadius="lg"
                            placeholder='Tutor'
                            name='tutor'
                            value={formData.tutor}
                            onChange={handleChange}
                        >
                            {tutores.map((option) => (
                                <option key={option.value} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </GridItem>
                </Grid>

                <Grid marginTop={5} templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <Button borderRadius="lg" colorScheme='blue' size='md' type="submit" w="full">
                            Cancelar
                        </Button>
                    </GridItem>
                    <GridItem>
                        <Button borderRadius="lg" colorScheme='red' size='md' type="submit" w="full" >
                            Criar Pet
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Container>
    );
}
