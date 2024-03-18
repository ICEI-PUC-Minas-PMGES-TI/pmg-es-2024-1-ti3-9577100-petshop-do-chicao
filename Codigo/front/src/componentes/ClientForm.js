import React, { useState } from 'react';
import axios from 'axios';

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
                <form action="#">
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input required="" class="form-control" name="username" id="username" type="text"></input>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input required="" class="form-control" name="email" id="email" type="email"></input>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input required="" class="form-control" name="password" id="password" type="password"></input>
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Confirm Password:</label>
                        <input required="" class="form-control" name="confirm-password" id="confirm-password" type="password"></input>
                    </div>
                    <input type="submit" class="btn" value="submit"></input>
                </form>
            </div>
        </div>

    );
}

export default ClientForm;
