import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StyleForm.css';

function ClientForm() {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    cpf: ''
  });

  const [clientes, setClientes] = useState([]);

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
      // Atualiza a lista de clientes após o cadastro bem-sucedido
      fetchClientes();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8081/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao obter clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []); // Chama uma vez ao carregar o componente

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="text-header">Cadastro</div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nome">Nome:</label>
                  <input
                    required
                    className="form-control"
                    name="nome"
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endereco">Endereço:</label>
                  <input
                    required
                    className="form-control"
                    name="endereco"
                    id="endereco"
                    type="text"
                    value={formData.endereco}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefone">Telefone:</label>
                  <input
                    required
                    className="form-control"
                    name="telefone"
                    id="telefone"
                    type="text"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    required
                    className="form-control"
                    name="email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpf">CPF:</label>
                  <input
                    required
                    className="form-control"
                    name="cpf"
                    id="cpf"
                    type="text"
                    value={formData.cpf}
                    onChange={handleChange}
                  />
                </div>
                <input type="submit" className="btn" value="Submit" />
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="text-header">Clientes Cadastrados</div>
            </div>
            <div className="card-body">
              {clientes.map((cliente, index) => (
                <div key={index} className="cliente-card">
                  <h5>{cliente.nome}</h5>
                  <p>{cliente.endereco}</p>
                  <p>{cliente.telefone}</p>
                  <p>{cliente.email}</p>
                  <p>{cliente.cpf}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientForm;
