'use client'
import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Button
  } from "@nextui-org/react";
class Dadosmestres extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            products : []
        }
    }

    componentDidMount(){
        this.buscarProduto();
    }

    buscarProduto = () => {
    fetch("http://localhost:8081/products")
        .then(response => response.json())
        .then(data => {
            this.setState({ products : data})
        })
    }

    deletarProduto = (id) =>{
        fetch("http://localhost:8081/products"+"/"+id,{ method: 'DELETE'})
        .then(response =>{
            if(response.ok){
                this.buscarProduto();
            }
        })
    }


    render(){
        return (
            <div>
                <div>Tabela de Produtos</div>
            <Table aria-label="Example table with dynamic content">
            <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Descrição</TableColumn>
        <TableColumn>Preço</TableColumn>
        <TableColumn>Opções</TableColumn>
      </TableHeader>
      <TableBody>
      {
                        this.state.products.map((produto) =>
                        <TableRow>
                        <TableCell> {produto.idproducts} </TableCell>
                        <TableCell> {produto.produto_descricao} </TableCell>
                        <TableCell> {produto.preco} </TableCell>
                        <TableCell>  <Button>Atualizar</Button> <Button onClick={() => this.deletarProduto(produto.idproducts)}>Excluir</Button> </TableCell>
                        </TableRow>
                        )
                    }
      </TableBody>
    </Table>
            </div>
            
            
        )
    }
}

export default Dadosmestres;
