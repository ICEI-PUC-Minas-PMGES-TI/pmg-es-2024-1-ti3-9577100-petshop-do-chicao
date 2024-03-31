'use client'
import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/react";
class Dadosmestres extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            products : []
        }
    }

    componentDidMount(){
        fetch("http://localhost:8081/products")
        .then(response => response.json())
        .then(data => {
            this.setState({ products : data})
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
      </TableHeader>
      <TableBody>
      {
                        this.state.products.map((produto) =>
                        <TableRow>
                        <TableCell> {produto.idproducts} </TableCell>
                        <TableCell> {produto.produto_descricao} </TableCell>
                        <TableCell> {produto.preco} </TableCell>
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
