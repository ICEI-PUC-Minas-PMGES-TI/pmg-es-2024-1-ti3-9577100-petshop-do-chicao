import React, {useState, useEffect} from 'react';
import {Container, Input, Grid, GridItem, Button, Select} from '@chakra-ui/react';
import axios from 'axios';
import { Heading } from '@chakra-ui/react';
import DeleteButton from './DeleteButton';

export default function DadosPets({ pet }) {
    const [formData, setFormData] = useState({
        nome: '',
        raca: '',
        temperamento: '',
        idade: '',
        observacoes: '',
        tutor: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    useEffect(() => {
        if (pet) {
            setFormData({
                nome: pet.nome || '',
                raca: pet.raca || '',
                temperamento: pet.temperamento || '',
                idade: pet.idade || '',
                observacoes: pet.observacoes || '',
                tutor: pet.tutor || ''
            });
        } else {
            clearForm();
        }
    }, [pet]);

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

    const clearForm = () => {
        setFormData({
            nome: '',
            raca: '',
            temperamento: '',
            idade: '',
            observacoes: '',
            tutor: ''
        });
    };

    const handleDadosPetsChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const dadosPet = {
            nome: formData.nome,
            raca: formData.raca,
            temperamento: formData.temperamento,
            idade: formData.idade,
            observacoes: formData.observacoes,
            tutor: formData.tutor
        };

        console.log(dadosPet);

        axios.put(`http://localhost:8081/pets/${pet.id}`, dadosPet)
            .then(response => {
                console.log('Pet atualizado:', response.data);
                clearForm();
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao atualizar pet:', error);
            });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8081/pets/${pet.id}`)
            .then(response => {
                console.log('Pet deletado:', response.data);
                clearForm();
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao deletar pet:', error);
            });
    };


    return (
        <Container>
            <Heading pb={10} pt={10} fontSize={40} textAlign={'center'}>
                Cadastro de Pets
            </Heading>
            <form onSubmit={handleUpdate}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Nome'
                            name='nome'
                            value={formData.nome}
                            onChange={handleDadosPetsChange}
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
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Idade'
                            name='idade'
                            value={formData.idade}
                            onChange={handleDadosPetsChange}
                        />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Input
                            borderRadius="lg"
                            placeholder='Observações'
                            name='observacoes'
                            value={formData.observacoes}
                            onChange={handleDadosPetsChange}
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

                <Grid marginTop={5} marginBottom={5} templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <DeleteButton pet={pet} limparFormulario={clearForm} handleDelete={handleDelete} />
                    </GridItem>
                    <GridItem>
                        <Button borderRadius="lg" colorScheme='green' size='md' type="submit" w="full">
                            Atualizar Pet
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Container>
    );
}
