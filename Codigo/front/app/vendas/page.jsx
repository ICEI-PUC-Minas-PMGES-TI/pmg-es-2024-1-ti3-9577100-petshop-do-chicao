'use client'

import Vendas from "@/componentes/Vendas";

export default function Page() {
  return (
    <ChakraProvider theme={theme}>
      <Flex>
        <Text>Vendas</Text>
        <Spacer />
        <Button onClick={onOpen}>Efetuar venda</Button>
      </Flex>

      <TableContainer paddingTop="14px">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Produto</Th>
              {/* <Th>Quantidade</Th>
              <Th>Vendedor</Th>
              <Th>Cliente</Th> */}
              <Th>Valor Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {produtos.map((produto) => (
              <Tr key={produto.idproducts}>
                <Td>{produto.produto_descricao}</Td>
                <Td>{produto.preco}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* <Button onClick={onCreateProductOpen}>Cadastrar Produto</Button> */}

      {/* <AlertDialog isOpen={isCreateProductOpen} onClose={onCreateProductClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Cadastrar Produto</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <FormProdutos button={<Button>Cadastrar Produto</Button>}/>
            </AlertDialogBody>
            <AlertDialogFooter />
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog> */}

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Efetuar Venda</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormVendas button={<Button width="100%">Efetuar Venda</Button>}/>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </ChakraProvider>
  );
}