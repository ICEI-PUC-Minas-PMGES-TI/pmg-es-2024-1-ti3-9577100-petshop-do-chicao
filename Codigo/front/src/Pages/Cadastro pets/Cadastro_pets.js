import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CadastroPets.css';

function CadastroPets() {
    const [Petdata, setPetdata] = useState({
        nome: '',
        especie: '',
        raca: '',
        tutor:'',
        observacoes: ''
    });

    const [Pets, setPets] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetdata({
            ...Petdata,
            [name]: value
        });
    };

    const FormPets = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/pets', Petdata);
            setPetdata({
                nome: '',
                especie: '',
                raca: '',
                tutor:'',
                observacoes: ''
            });
            // Atualiza a lista de clientes após o cadastro bem-sucedido
            fetchPets();
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
        }
    };

    const fetchPets = async () => {
        try {
            const response = await axios.get('http://localhost:8081/pets');
            setPets(response.data);
        } catch (error) {
            console.error('Erro ao obter clientes:', error);
        }
    };

    useEffect(() => {
        fetchPets();
    }, []); // Chama uma vez ao carregar o componente

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card-pet">
                        <div className="card-header">
                            <div className="text-header">Cadastro</div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={FormPets}>
                                <div className="form-group">
                                    <label htmlFor="nome">Nome:</label>
                                    <input
                                        required
                                        className="form-control"
                                        name="nome"
                                        id="nome"
                                        type="text"
                                        value={Petdata.nome}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="especie">Especie:</label>
                                    <input
                                        required
                                        className="form-control"
                                        name="especie"
                                        id="especie"
                                        type="text"
                                        value={Petdata.especie}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="raca">Raca:</label>
                                    <input
                                        required
                                        className="form-control"
                                        name="raca"
                                        id="raca"
                                        type="text"
                                        value={Petdata.raca}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tutor">Tutor:</label>
                                    <input
                                        required
                                        className="form-control"
                                        name="tutor"
                                        id="tutor"
                                        type="tutor"
                                        value={Petdata.tutor}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="observacoes">Observacoes:</label>
                                    <input
                                        required
                                        className="form-control"
                                        name="observacoes"
                                        id="observacoes"
                                        type="text"
                                        value={Petdata.observacoes}
                                        onChange={handleChange}
                                    />
                                </div>
                                <input type="submit" className="btn" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="GetPet">
                        <div className="card-header">
                            <div className="text-header">Pets Cadastrados</div>
                        </div>
                        <div className="card-body">
                            {Pets.map((pet, index) => (
                                <div key={index} className="pet-card">
                                    <div>
                                        <div className="title">
                                            <h5>{pet.nome}</h5>
                                            <p>Tutor: {pet.tutor}</p>
                                        </div>
                                        <div className="description">
                                            <p>Especie: {pet.especie}</p>
                                            <p>Raca: {pet.raca}</p>
                                            <p>Observações: {pet.observacoes}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastroPets;
