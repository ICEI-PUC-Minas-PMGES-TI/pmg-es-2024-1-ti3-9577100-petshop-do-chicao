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
  import { FormEvent } from "react";

class Estoque extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            id: 0,
            produto_descricao: '',
            preco: '',
            qtde: '',
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

    carregarDados = (id) =>{
        fetch("http://localhost:8081/products"+"/"+id,{ method: 'GET'})
        .then(resposta => resposta.json())
        .then(produtos => {
            this.setState({ 
                id : produtos[0].id,
                produto_descricao: produtos[0].produto_descricao,
                preco: produtos[0].preco,
                qtde: produtos[0].qtde
             })
        })
    }

    cadastraProduto = (produto) => {
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
    atualizarProduto = (produto) => {
        fetch("http://localhost:8081/products"+"/"+produto.id,
        { method: 'PUT' , 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(produto)
        })
        .then(response =>{
            if(response.ok){
                this.buscarProduto();
            }else{
                alert('Não foi possível atualizar o produto')
            }
        })
    }

    atualizaQtde = (q) =>{
        this.setState({
            qtde: q.target.value
        })
    }

    atualizaDescricao = (d) =>{
        this.setState({
            produto_descricao: d.target.value
        })
    }

    atualizaPreco = (p) =>{
        this.setState({
            preco: p.target.value
        })
    }

    submit = () => {

        if(this.state.id == 0){
            const produto = {
                produto_descricao: this.state.produto_descricao,
                preco: this.state.preco,
                qtde: this.state.qtde
            }
        this.cadastraProduto(produto);
        }else{
            const produto = {
                id: this.state.id,
                produto_descricao: this.state.produto_descricao,
                preco: this.state.preco,
                qtde: this.state.qtde
            }
        this.atualizarProduto(produto);
        }
    }

    reset = () => {
        this.setState({
            id: 0,
            produto_descricao:'',
            preco:'',
            qtde: ''
        })

    }


    render(){
        return (
            <div>
                <div>
                <form>
                    <label for="iname">ID</label>
                    <input type="text" id="iname" name="id" value={ this.state.id } readOnly={true}/>
                    <label for="fname">Descrição:</label>
                    <input type="text" id="fname" name="descricao" value={ this.state.produto_descricao } onChange={this.atualizaDescricao}/>
                    <label for="lname">Preço:</label>
                    <input type="text" id="lname" name="preco" value={ this.state.preco } onChange={this.atualizaPreco}/>
                    <label for="qname">Quantidade:</label>
                    <input type="text" id="qname" name="quantidade" value={ this.state.qtde } onChange={this.atualizaQtde} readOnly={true}/>
                    <Button onClick={this.submit}>Adicionar</Button>
                    <Button onClick={this.reset}>Novo</Button>
                </form>
                </div>
                <div>Tabela de Produtos</div>
            <Table aria-label="Example table with dynamic content">
            <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Descrição</TableColumn>
        <TableColumn>Preço</TableColumn>
        <TableColumn>Quantidade</TableColumn>
        <TableColumn>Opções</TableColumn>
      </TableHeader>
      <TableBody>
      {
                        this.state.products.map((produto) =>
                        <TableRow>
                        <TableCell> {produto.id} </TableCell>
                        <TableCell> {produto.produto_descricao} </TableCell>
                        <TableCell> {produto.preco} </TableCell>
                        <TableCell> {produto.qtde} </TableCell>
                        <TableCell>  <Button onClick={() => this.carregarDados(produto.id)}>Atualizar</Button>
                         <Button onClick={() => this.deletarProduto(produto.id)}>Excluir</Button> </TableCell>
                        </TableRow>
                        )
                    }
      </TableBody>
    </Table>
            </div>
            
            
        )
    }
}

export default Estoque;
