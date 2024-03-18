import React, { useState } from 'react';
import axios from 'axios';
import './StyleForm.css'

function ClientForm() {
    const [formData, setFormData] = useState({
        nome: '',
        endereco: '',
        telefone: '',
        email: '',
        cpf: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/clientes', formData);
            console.log('Dados do formulário:', formData);
            setFormData({
                nome: '',
                endereco: '',
                telefone: '',
                email: '',
                cpf: ''
            });
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
        }
    };

    return (
        <div class="card">
            <div class="card-header">
                <div class="text-header">Register</div>
            </div>
            <div class="card-body">
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label for="nome">Nome:</label>
                        <input
                            required=""
                            class="form-control"
                            name="nome"
                            id="nome"
                            type="text"
                            value={formData.nome}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div class="form-group">
                        <label for="endereco">Endereço:</label>
                        <input
                            required=""
                            class="form-control"
                            name="endereco"
                            id="endereco"
                            type="text"
                            value={formData.endereco}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div class="form-group">
                        <label for="telefone">Telefone:</label>
                        <input
                            required=""
                            class="form-control"
                            name="telefone"
                            id="telefone"
                            type="text"
                            value={formData.telefone}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input
                            required=""
                            class="form-control"
                            name="email"
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div class="form-group">
                        <label for="cpf">CPF:</label>
                        <input
                            required=""
                            class="form-control"
                            name="cpf"
                            id="cpf"
                            type="text"
                            value={formData.cpf}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <input type="submit" class="btn" value="Submit"></input>
                </form>
            </div>
        </div>
    );
}

export default ClientForm;
