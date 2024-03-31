import React from "react";
import Table from 'react-bootstrap/Table';
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.products.map((produto) =>
                        <tr>
                        <td> {produto.idproducts} </td>
                        <td> {produto.produto_descricao} </td>
                        <td> {produto.preco} </td>
                        </tr>
                        )
                    }
                </tbody>
            </Table>
            </div>
            
        )
    }
}

export default Dadosmestres;
