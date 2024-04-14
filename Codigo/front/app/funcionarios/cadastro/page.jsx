'use client'

import { theme } from "@/app/theme";
import { Button, Center, ChakraProvider, FormControl, Grid, GridItem, Input, SimpleGrid, Text } from "@chakra-ui/react";
import InputMask from 'react-input-mask';

export default function CadastrarFuncionario() {
  return (
    <ChakraProvider theme={theme}>
      <FormControl>
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
                <Input placeholder="Email" type="email"/>
                <InputMask mask="(99) 99999-9999">
                  {(_) => (<Input placeholder="Telefone" type="tel"/>)}
                </InputMask>
                <InputMask mask="999.999.999-99">
                  {(_) => (<Input placeholder="CPF"/>)}
                </InputMask>
                <Input placeholder="Senha" type="password"/>
                <Input placeholder="Confirmar Senha" type="password"/>
              </SimpleGrid>
            </GridItem>
            <GridItem area={'headerEndereco'}>
              <Text fontSize='sm' fontWeight='bold'>Endereço</Text>
            </GridItem>
            <GridItem area={'endereco'}>
              <SimpleGrid columns='2' spacingX={'4'} spacingY={'2'}>
                <InputMask mask="99999-999">
                  {(_) => (<Input placeholder="CEP"/>)}
                </InputMask>
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
      </FormControl>
    </ChakraProvider>
  );
}