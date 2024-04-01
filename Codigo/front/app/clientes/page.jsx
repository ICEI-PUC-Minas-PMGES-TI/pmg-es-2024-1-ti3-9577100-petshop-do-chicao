'use client'

import { Input } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { Container } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'

export default function Clientes() {
    return (

        <Container maxW='1000px'>
            <Flex>
                <Flex minWidth='max-content' alignItems='center' gap='2'>
                    <Input placeholder='Search' />
                    <IconButton aria-label='Search database' icon={<SearchIcon />} />
                </Flex>
                <Spacer />
                <Button colorScheme='teal' size='md'>
                    Button
                </Button>
            </Flex>

            <TableContainer border='1px' borderColor='gray.200' borderRadius='xl' height='800px'>
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                        </Tr>
                        <Tr>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Container>
    );
}