import React, { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Container } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import DadosPets from './DadosPets';
import FormPets from "@/componentes/FormPet";

export default function Clientes() {
    const [pets, setPets] = useState([]);
    const [petSelecionado, setPetSelecionado] = useState(null);
    const [isOpenDadosPet, setIsOpenDadosPet] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:8081/pets');
                setPets(response.data);
            } catch (error) {
                console.error('Erro ao buscar pets:', error);
            }
        };

        fetchPets();
    }, []);

    const handlePetClick = (pet) => {
        setPetSelecionado(pet);
        setIsOpenDadosPet(true);
    };

    const handleCloseDadosPet = () => {
        setPetSelecionado(null);
        setIsOpenDadosPet(false);
    };

    return (
        <Container maxW='auto'>
            <Flex marginBottom='15px'>
                <Flex minWidth='max-content' alignItems='center'>
                    <Input placeholder='Search' borderRight='0px' borderRadius='lg' borderRightRadius='0px' />
                    <IconButton backgroundColor='white' aria-label='Search database' border='1px' borderLeft='0px' borderColor='gray.200' borderRadius='lg' borderLeftRadius='0px' icon={<SearchIcon />} />
                </Flex>
                <Spacer />
                <Button colorScheme='red' size='md' borderRadius='lg' onClick={onOpen}>
                    Novo Pet
                </Button>

                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <FormPets/>
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialog>
            </Flex>

            <TableContainer border='1px' borderColor='gray.200' borderRadius='lg' padding='10px'>
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>Raça</Th>
                            <Th isNumeric>Idade</Th>
                            <Th>Temperamento</Th>
                            <Th>Observações</Th>
                            <Th>Tutor</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {pets.map((pet, index) => (
                            <Tr key={index} onClick={() => handlePetClick(pet)}>
                                <Td width='auto'>{pet.nome}</Td>
                                <Td width='auto'>{pet.raca}</Td>
                                <Td isNumeric width='auto'>{pet.idade}</Td>
                                <Td width='auto'>{pet.temperamento}</Td>
                                <Td width='auto'>{pet.observacoes}</Td>
                                <Td width='auto'>{pet.tutor}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={handleCloseDadosPet}
                isOpen={isOpenDadosPet}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {petSelecionado && <DadosPets pet={petSelecionado} />}
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </Container>
    );
}
