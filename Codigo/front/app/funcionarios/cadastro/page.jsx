'use client'

import { theme } from "@/app/theme";
import { Button, Center, ChakraProvider, FormControl, Grid, GridItem, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { PatternFormat } from 'react-number-format';

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
                <Input  placeholder="Nome" id="nome"/>
                <Input  placeholder="Email" type="email" id="email"/>
                <PatternFormat format="(##) #####-####" placeholder="Telefone" id="telefone" valueIsNumericString={true} customInput={Input}/>
                <PatternFormat format="###.###.###-##" placeholder="CPF" id="cpf" valueIsNumericString={true} customInput={Input}/>
                <Input placeholder="Senha" type="password" id="senha"/>
                <Input placeholder="Confirmar Senha" type="password" id="confirmarSenha"/>
              </SimpleGrid>
            </GridItem>
            <GridItem area={'headerEndereco'}>
              <Text fontSize='sm' fontWeight='bold'>Endereço</Text>
            </GridItem>
            <GridItem area={'endereco'}>
              <SimpleGrid columns='2' spacingX={'4'} spacingY={'2'}>
                <PatternFormat format="#####-###" placeholder="CEP" id="cep" valueIsNumericString={true} customInput={Input}/>
                <Input placeholder="Estado" disabled={true} id="estado"/>
                <Input placeholder="Cidade" disabled={true} id="cidade"/>
                <Input placeholder="Bairro" disabled={true} id="bairro"/>
                <Input placeholder="Rua" disabled={true} id="rua"/>
                <Input placeholder="Complemento" id="complemento"/>
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