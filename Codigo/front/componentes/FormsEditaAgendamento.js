import React, { useState, useEffect } from 'react';
import { Container, Input, Grid, GridItem, Button, Select, Textarea } from '@chakra-ui/react';
import axios from 'axios';
import { Heading } from '@chakra-ui/react';
import DeleteButton from './DeleteButton';

export default function Dadosagendamentos({ agendamento }) {
    const [formData, setFormData] = useState({
        servico: '',
        cliente: '',
        pet: '',
        horario: '',
        duracao: '',
        observacoes: ''
    });

    useEffect(() => {
        if (agendamento) {
            setFormData({
                servico: agendamento.title.split(' - ')[0],
                cliente: agendamento.title.split(' - ')[1],
                pet: agendamento.title.split(' - ')[2],
                horario: agendamento.start,
                duracao: agendamento.extendedProps.duracao,
                observacoes: agendamento.extendedProps.observacoes
            });
            const selectedServico = servicos.find((servico) => servico.label === agendamento.title.split(' - ')[0]);
            if (selectedServico) {
                setFormData({
                    ...formData,
                    duracao: selectedServico.duracao
                });
            }
        }
    }, [agendamento]);

    const [servicos, setServicos] = useState([]);
    const [selectedServico, setSelectedServico] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:8081/servicos");
            const servicoData = response.data.map((servico) => ({
                value: servico.id,
                label: servico.tipo,
                duracao: servico.duracao,
                valor: servico.valor
            }));
            setServicos(servicoData);
        }

        fetchData();
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

    const handleClienteChange = (e) => {
        const clienteId = e.target.value;
        async function fetchPetsByTutor() {
            const response = await axios.get(`http://localhost:8081/pets/tutor/${clienteId}`);
            const petsData = response.data.map((pet) => ({
                value: pet.id,
                label: pet.nome,
            }));
            setPet(petsData);
        }
        fetchPetsByTutor();
        setFormData({
            ...formData,
            cliente: e.target.value,
        });
    };
    const clearForm = () => {
        setFormData({
            servico: '',
            cliente: '',
            pet: '',
            horario: '',
            duracao: '',
            observacoes: ''
        });
    };

    const handleServicoChange = (e) => {
        const selectedServico = servicos.find((servico) => servico.label === e.target.value);
        setSelectedServico(selectedServico);
        setFormData({
            ...formData,
            servico: e.target.value,
            duracao: selectedServico? selectedServico.duracao : ''
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const dadosagendamento = {
            servico: formData.servico,
            cliente: formData.cliente,
            pet: formData.pet,
            horario: formData.horario,
            duracao: formData.duracao,
            observacoes: formData.observacoes
        };

        console.log(dadosagendamento);

        axios.put(`http://localhost:8081/agendamento/${agendamento.id}`, dadosagendamento)
            .then(response => {
                console.log('Agendamento atualizado:', response.data);
                clearForm();
                window.location.reload();
            })
            .catch(error => {
                alert('Erro ao atualizar agendamento, verifique os dados inseridos!');
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
                Editar Agendamento
            </Heading>
            <form onSubmit={handleUpdate}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                        <Select
                            borderRadius="lg"
                            placeholder='Serviço'
                            name='servico'
                            value={formData.servico}
                            onChange={handleServicoChange}
                        >
                            {servicos.map((option) => (
                                <option key={option.value} value={option.label}>
                                    {option.label + " - R$" + option.valor}
                                </option>
                            ))}
                        </Select>
                    </GridItem>
                    <GridItem>
                        <Select
                            borderRadius="lg"
                            placeholder='Cliente'
                            name='cliente'
                            value={formData.cliente}
                            onChange={handleClienteChange}
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
                            onChange={(e) => setFormData({...formData, pet: e.target.value })}
                        >
                            {pet.map((option) => (
                                <option key={option.value} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </GridItem>
                    <GridItem  colSpan={2}>
                        <Input
                            borderRadius="lg"
                            placeholder='Horário'
                            name='horario'
                            type='datetime-local'
                            value={formData.horario}
                            onChange={(e) => setFormData({...formData, horario: e.target.value })}
                        />
                    </GridItem>
                    <GridItem  colSpan={2}>
                        <Textarea
                            borderRadius="lg"
                            placeholder='Observações'
                            name='observacoes'
                            value={formData.observacoes}
                            onChange={(e) => setFormData({...formData, observacoes: e.target.value })}
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