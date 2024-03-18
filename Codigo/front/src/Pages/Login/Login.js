import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState } from 'react'
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [username, setUsername] =useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/login', {username, password})
        .then(res => {
            if (res.data === "Login bem sucedido") {
            navigate('/menu')
            } else
            alert('Login falhou')})     
        .catch(err => console.log(err))
    }

  return (

<form className="form card" onSubmit={handleSubmit}>
<div className="card_header">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
  </svg>
  <h1 className="form_heading">Faça seu login</h1>
</div>
<div className="field">
  <label htmlFor="nome">Nome de usuário</label>
  <input className="input" name="username" type="text" placeholder="Insira seu nome de usuário" onChange={ u => setUsername(u.target.value) } id="username"/>
</div>
<div className="field">
  <label htmlFor="password">Senha</label>
  <input className="input" name="password" type="password" placeholder="Insira sua senha" id="password" onChange={ p => setPassword(p.target.value) }/>
</div>
<div className="field">
  <button className="button">Entrar</button>
</div>
</form>
  )
}

export default Login