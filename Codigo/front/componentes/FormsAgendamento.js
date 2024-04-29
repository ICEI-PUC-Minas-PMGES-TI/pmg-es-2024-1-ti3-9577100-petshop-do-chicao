import React, {useState, useEffect} from 'react';
import {Container, Input, Grid, GridItem, Button, Select, Textarea} from '@chakra-ui/react';
import axios from 'axios';
import { Heading } from '@chakra-ui/react';
import DeleteButton from './DeleteButton';
import {hoist} from "next/dist/build/templates/helpers";

export default function Dadosagendamentos({ agendamento }) {
    const [formData, setFormData] = useState({
        servico: '',
        cliente: '',
        agendamento: '',
        horario: agendamento ? new Date(agendamento.start).toISOString().slice(0, 16) : '',
        observacoes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    // useEffect(() => {
    //     if (agendamento) {
    //         setFormData({
    //             servico: agendamento.servico || '',
    //             cliente: agendamento.cliente || '',
    //             agendamento: agendamento.agendamento || '',
    //             horario: agendamento.horario || '',
    //             observacoes: agendamento.observacoes || ''
    //         });
    //     } else {
    //         clearForm();
    //     }
    // }, [agendamento]);

    useEffect(() => {
        if (agendamento) {
            setFormData({
                servico: agendamento.servico || '',
                cliente: agendamento.cliente || '',
                pet: agendamento.pet || '',
                horario: agendamento.horario || '',
                observacoes: agendamento.observacoes || ''
            });
        } else {
            clearForm();
        }
    }, [agendamento]);


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

    const [pet, setPet] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:8081/pets");
            const petsData = response.data.map((pet) => ({
                value: pet.id,
                label: pet.nome,
            }));
            setPet(petsData);
        }

        fetchData();
    }, []);

    const clearForm = () => {
        setFormData({
            servico: '',
            cliente: '',
            pet: '',
            horario: '',
            observacoes: ''
        });
    };

    const handleDadosagendamentosChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const dadosagendamento = {
            servico: formData.servico,
            cliente: formData.cliente,
            pet: formData.pet,
            horario: formData.horario,
            observacoes: formData.observacoes
        };

        console.log(dadosagendamento);

        axios.post(`http://localhost:8081/agendamento`, dadosagendamento)
            .then(response => {
                console.log('agendamento atualizado:', response.data);
                clearForm();
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao atualizar agendamento:', error);
            });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8081/agendamento/${agendamento.id}`)
            .then(response => {
                console.log('agendamento deletado:', response.data);
                clearForm();
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao deletar agendamento:', error);
            });
    };


    return (
        <Container>
            <Heading pb={10} pt={10} fontSize={40} textAlign={'center'}>
                Agendamento
            </Heading>
            <form onSubmit={handleUpdate}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Serviço'
                            name='servico'
                            value={formData.servico}
                            onChange={handleDadosagendamentosChange}
                        />
                    </GridItem>
                    <GridItem>
                        <Select
                            borderRadius="lg"
                            placeholder='Cliente'
                            name='cliente'
                            value={formData.cliente}
                            onChange={handleChange}
                        >
                            {tutores.map((option) => (
                                <option key={option.value} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </GridItem>
                    <GridItem>
                        <Select
                            borderRadius="lg"
                            placeholder='Pet'
                            name='pet'
                            value={formData.pet}
                            onChange={handleChange}
                        >
                            {pet.map((option) => (
                                <option key={option.value} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Horário'
                            name='horario'
                            type='datetime-local'
                            value={formData.horario}
                            onChange={handleDadosagendamentosChange}
                        />
                    </GridItem>
                    <GridItem  colSpan={2}>
                        <Textarea
                            borderRadius="lg"
                            placeholder='Observações'
                            name='observacoes'
                            value={formData.observacoes}
                            onChange={handleDadosagendamentosChange}
                        />
                    </GridItem>
                </Grid>

                <Grid marginTop={5} marginBottom={5} templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <DeleteButton agendamento={agendamento} limparFormulario={clearForm} handleDelete={handleDelete} />
                    </GridItem>
                    <GridItem>
                        <Button borderRadius="lg" colorScheme='green' size='md' type="submit" w="full">
                            Realizar agendamento
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Container>
    );
}
