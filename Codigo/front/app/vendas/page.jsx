'use client'
import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/react";
  import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup } from '@chakra-ui/react';
import axios from "axios";

import { useDisclosure } from "@chakra-ui/react";
import FormVendas from "@/componentes/FormVendas";


  export default function Vendas(){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [products, setProdutos] = useState([]);
    const cancelRef = React.useRef();


    useEffect   (() => {
        return () => {
            axios
        .get("http://localhost:8081/products")
        .then(function (response) {
            console.log(response);
          setProdutos(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

        };
      }, []);

    const buscarProduto = () => {
    fetch("http://localhost:8081/products")
        .then(response => response.json())
        .then(data => {
            setProdutos({ products : data})
            console.log(products);
            console.log(response);
        })
    }

    const deletarProduto = (id) =>{
        fetch("http://localhost:8081/products"+"/"+id,{ method: 'DELETE'})
        .then(response =>{
            if(response.ok){
                this.buscarProduto();
            }
        })
    }

    const cadastraProduto = (produto) => {
        fetch("http://localhost:8081/products",
        { method: 'POST' , 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(produto)
        })
        .then(response =>{
            if(response.ok){
                this.buscarProduto();
            }else{
                alert('Não foi possível adicionar produto')
            }
        })
    }


    const atualizaDescricao = (d) =>{
        this.setState({
            produto_descricao: d.target.value
        })
    }

    const atualizaPreco = (p) =>{
        this.setState({
            preco: p.target.value
        })
    }
    

    const submit = () => {
        const produto = {
            produto_descricao: this.state.produto_descricao,
            preco: this.state.preco
        }

        this.cadastraProduto();
    }


        return (
            
                <div>
                <Button colorScheme='red' size='md' borderRadius='lg' onClick={onOpen}>
                    Efetuar venda
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
                        <AlertDialogHeader>Cadastro de cliente</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <FormVendas/>
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialog>
                
                <div>Tabela de Produtos</div>
            <Table aria-label="Example table with dynamic content">
            <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Descrição</TableColumn>
        <TableColumn>Preço</TableColumn>
      </TableHeader>
      <TableBody>
      {
                        products.map((produto) =>(
                        <TableRow>
                        <TableCell> {produto.idproducts} </TableCell>
                        <TableCell> {produto.produto_descricao} </TableCell>
                        <TableCell> {produto.preco} </TableCell>
                        </TableRow>
                        ))
                    }
      </TableBody>
    </Table>
            </div>
            
        
        )
    }


