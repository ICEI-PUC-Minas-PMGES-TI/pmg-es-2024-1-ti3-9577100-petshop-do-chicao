import {Container, Input, Grid, GridItem, Button, Stack, Select, Textarea} from '@chakra-ui/react';
import {useState, useRef, useEffect} from 'react';
import { Heading } from '@chakra-ui/react';
import axios, {options} from 'axios';
import InputMask from 'react-input-mask';

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

    // const [racas, setRacas] = useState([]);

    // const fetchData = async () => {
    //     const response = await fetch("./racas.json");
    //     const jsonData = await response.json();
    //     setRacas(jsonData);
    // };
    //
    // useEffect(() => {
    //     console.log(racas);
    //     fetchData();
    // }, []);

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
            <Heading pb={10} pt={40} fontSize={40} textAlign={'center'}>
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
                            {/*{racas.map((option) => (*/}
                            {/*    <option key={option.value} value={option.value}>*/}
                            {/*        {option.label}*/}
                            {/*    </option>*/}
                            {/*))}*/}
                            <option value='Labrador Retriever'>Labrador Retriever</option>
                            <option value='Poodle'>Poodle</option>
                            <option value='Pastor Alemão'>Pastor Alemão</option>
                            <option value='Golden Retriever'>Golden Retriever</option>
                            <option value='Bulldog Francês'>Bulldog Francês</option>
                            <option value='Shih Tzu'>Shih Tzu</option>
                            <option value='Yorkshire'>Yorkshire</option>
                            <option value='Lhasa Apso'>Lhasa Apso</option>
                            <option value='Pug'>Pug</option>
                            <option value='Pinscher'>Pinscher</option>
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
                            placeholder='Raça'
                            name='tutor'
                            value={formData.tutor}
                            onChange={handleChange}
                        >
                            {tutores.map((option) => (
                                <option key={option.value} value={option.value}>
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


// import React, { useState } from 'react';
// import {
//     Container,
//     Heading,
//     FormControl,
//     FormLabel,
//     Input,
//     Button,
//     Grid,
//     GridItem,
//     InputGroup,
//     InputRightElement,
//     FormErrorMessage,
//     Textarea, Flex,
// } from '@chakra-ui/react';
//
// const PetForm = () => {
//     const [raca, setRaca] = useState('');
//     const [temperamento, setTemperamento] = useState('');
//     const [nome, setNome] = useState('');
//     const [idade, setIdade] = useState('');
//     const [observacoes, setObservacoes] = useState('');
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission logic here
//         console.log('Form submitted:', { raca, temperamento, nome, idade, observacoes });
//     };
//
//     return (
//         <Container centerContent>
//             <Flex
//                 direction="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 mt={10}
//             >
//             <Heading as="h1" size="2xl" textAlign="center" mb={10}>
//                 Cadastro de Pet
//             </Heading>
//             <form onSubmit={handleSubmit}>
//                 <FormControl mb={5}>
//                     <Heading as="h5" size="sm" mb={2}>
//                         Dados do Pet
//                     </Heading>
//                     <Grid templateColumns="repeat(2, 1fr)" gap={6}>
//                         <GridItem>
//                             <FormLabel htmlFor="raca">Raça</FormLabel>
//                             <Input
//                                 id="raca"
//                                 name="raca"
//                                 value={raca}
//                                 onChange={(e) => setRaca(e.target.value)}
//                             />
//                         </GridItem>
//                         <GridItem>
//                             <FormLabel htmlFor="temperamento">Temperamento</FormLabel>
//                             <Input
//                                 id="temperamento"
//                                 name="temperamento"
//                                 value={temperamento}
//                                 onChange={(e) => setTemperamento(e.target.value)}
//                             />
//                         </GridItem>
//                         <GridItem>
//                             <FormLabel htmlFor="nome">Nome</FormLabel>
//                             <Input
//                                 id="nome"
//                                 name="nome"
//                                 value={nome}
//                                 onChange={(e) => setNome(e.target.value)}
//                             />
//                         </GridItem>
//                         <GridItem>
//                             <FormLabel htmlFor="idade">Idade</FormLabel>
//                             <Input
//                                 id="idade"
//                                 name="idade"
//                                 value={idade}
//                                 onChange={(e) => setIdade(e.target.value)}
//                             />
//                         </GridItem>
//                     </Grid>
//                 </FormControl>
//                 <FormControl mb={5}>
//                     <Heading as="h5" size="sm" mb={2}>
//                         Observações
//                     </Heading>
//                     <Textarea
//                         id="observacoes"
//                         name="observacoes"
//                         value={observacoes}
//                         onChange={(e) => setObservacoes(e.target.value)}
//                     />
//                 </FormControl>
//                 <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={5}>
//                     <GridItem>
//                         <Button colorScheme="gray" variant="outline" w="full">
//                             Cancelar
//                         </Button>
//                     </GridItem>
//                     <GridItem>
//                         <Button colorScheme="blue" w="full" type="submit">
//                             Criar Pet
//                         </Button>
//                     </GridItem>
//                 </Grid>
//             </form>
//             </Flex>
//         </Container >
//     );
// };
//
// export default PetForm;