'use client'

import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import styles from '../login/loginstyle.css'

function Login() {
    const router = useRouter();
    const [username, setUsername] =useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const res = await axios.post('http://localhost:8081/login', { username, password });
        if (res.data === "Login bem sucedido") {
          router.push('/menu');
        } else {
          alert('Login falhou');
        }
      } catch (err) {
        console.error(err);
      }
    };

  return (
<div className='formulario'>
<form className="form card" onSubmit={handleSubmit}>
<div className="card_header">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path fill="currentColor" d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"></path>
  </svg>
</div>
<div className="field">
  <input className="input" name="username" type="text" placeholder="Insira seu nome de usuário" onChange={ u => setUsername(u.target.value) } id="username"/>
</div>
<div className="field">
  <input className="input" name="password" type="password" placeholder="Insira sua senha" id="password" onChange={ p => setPassword(p.target.value) }/>
</div>
<div className="field">
  <button className="button">Entrar</button>
</div>
</form>
</div>
  )
}



export default Login