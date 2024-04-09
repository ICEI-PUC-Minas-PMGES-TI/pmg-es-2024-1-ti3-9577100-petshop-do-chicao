'use client'

import { theme } from "@/app/theme";
import { Button, Center, ChakraProvider, Container, Grid, GridItem, Input, SimpleGrid, Text } from "@chakra-ui/react";

export default function Teste() {
  return (
    <div>
        <ChakraProvider theme={theme}>
          <Center height='100vh'>
            <Grid templateAreas={`"headerDadosPessoais"
                                  "dadosPessoais"
                                  "headerEndereco"
                                  "endereco"
                                  "button"`}
                  gap={'2'}
            >
              <GridItem area={'headerDadosPessoais'}>
                <Text fontSize='sm' fontWeight='bold'>Dados Pessoais</Text>
              </GridItem>
              <GridItem area={'dadosPessoais'}>
                <SimpleGrid columns='2' spacingX={'4'} spacingY={'2'}>
                  <Input placeholder="Nome"/>
                  <Input placeholder="Sobrenome"/>
                  <Input placeholder="Email"/>
                  <Input placeholder="Telefone"/>
                </SimpleGrid>
              </GridItem>
              <GridItem area={'headerEndereco'}>
                <Text fontSize='sm' fontWeight='bold'>Endereço</Text>
              </GridItem>
              <GridItem area={'endereco'}>
                <SimpleGrid columns='2' spacingX={'4'} spacingY={'2'}>
                  <Input placeholder="CEP"/>
                  <Input placeholder="Estado" disabled={true}/>
                  <Input placeholder="Cidade" disabled={true}/>
                  <Input placeholder="Bairro" disabled={true}/>
                  <Input placeholder="Rua" disabled={true}/>
                  <Input placeholder="Complemento"/>
                </SimpleGrid>
              </GridItem>
              <GridItem area={'button'}>
                <Button width='100%'>Cadastrar Funcionário</Button>
              </GridItem>
            </Grid>
          </Center>
        </ChakraProvider>
    </div>
  );
}