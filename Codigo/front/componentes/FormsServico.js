import React, { useState, useEffect } from 'react';
import { Container, Input, Grid, GridItem, Button, Select, Heading } from '@chakra-ui/react';
import axios from 'axios';

export default function FormsServico() {
    const [formData, setFormData] = useState({
        tipo: '',
        duracao: '',
        valor: ''
    });

    const [editing, setEditing] = useState(false);
    const [servicos, setServicos] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/servicos')
            .then(response => {
                setServicos(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar serviços:', error);
            });
    }, []);

    const handleSelectServico = (e) => {
        const servico = servicos.find(servico => servico.tipo === e.target.value);
        setServicoSelecionado(servico);
        setFormData({
            tipo: servico.tipo,
            duracao: servico.duracao,
            valor: servico.valor
        });
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const dadosServico = {
            tipo: formData.tipo,
            duracao: formData.duracao,
            valor: formData.valor
        };

        const id = servicoSelecionado ? servicoSelecionado.id : 1;

        axios.put(`http://localhost:8081/servicos/${id}`, dadosServico)
            .then(response => {
                console.log('Serviço atualizado:', response.data);
                setFormData({
                    tipo: '',
                    duracao: '',
                    valor: ''
                });
                setEditing(false);
            })
            .catch(error => {
                console.error('Erro ao atualizar serviço:', error);
            });
    };

    const handleEditarServico = () => {
        const id = servicoSelecionado ? servicoSelecionado.id : 1;
        console.log(id);
        axios.put(`http://localhost:8081/servicos/${id}`, formData)
            .then(response => {
                alert('Serviço atualizado:');
                console.log('Serviço atualizado:', response.data);
                setFormData({
                    tipo: '',
                    duracao: '',
                    valor: ''
                });
            })
            .catch(error => {
                console.error('Erro ao atualizar serviço:', error);
            });
    };

    const handleCadastrarServico = () => {
        axios.post('http://localhost:8081/servicos', formData)
            .then(response => {
                alert('Serviço cadastrado:');
                console.log('Serviço cadastrado:', response.data);
                setFormData({
                    tipo: '',
                    duracao: '',
                    valor: ''
                });
            })
            .catch(error => {
                console.error('Erro ao cadastrar serviço:', error);
            });
    };

    return (
        <Container>
            <Heading pb={10} pt={10} fontSize={40} textAlign={'center'}>
                {editing ? 'Editar Serviço' : 'Novo Serviço'}
            </Heading>
            <form>
                {editing ? (
                    <GridItem>
                        <Select value={servicoSelecionado?.tipo} onChange={handleSelectServico}>
                            {servicos.map(servico => (
                                <option value={servico.tipo}>{servico.tipo}</option>
                            ))}
                        </Select>
                    </GridItem>
                ) : null}
                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            type='time'
                            value={formData.duracao}
                            onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                        />
                        <label>Duração do Serviço</label>
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Tipo de Serviço'
                            name='tipo'
                            value={formData.tipo}
                            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                        />
                    </GridItem>
                    <GridItem>
                        <Input
                            borderRadius="lg"
                            placeholder='Valor do Serviço'
                            name='valor'
                            type='number'
                            value={formData.valor}
                            onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                        />
                    </GridItem>
                </Grid>

                <Grid marginTop={5} marginBottom={5} templateColumns="repeat(2, 1fr)" gap={6}>
                    {editing ? (
                        <GridItem>
                            <Button borderRadius="lg" colorScheme='green' size='md' onClick={handleEditarServico} w="full">
                                Editar Serviço
                            </Button>
                        </GridItem>
                    ) : (
                        <GridItem>
                            <Button borderRadius="lg" colorScheme='green' size='md' onClick={handleCadastrarServico} w="full">
                                Cadastrar Serviço
                            </Button>
                        </GridItem>
                    )}
                    <GridItem>
                        <Button borderRadius="lg" colorScheme='blue' size='md' onClick={handleEdit} w="full">
                            {editing? 'Cancelar Edição' : 'Editar Serviço'}
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Container>
    );
}