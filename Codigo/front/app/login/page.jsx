'use client'

import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import styles from '../login/loginstyle.css'

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
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
      <h1 id='title'>Login</h1>
      <form className="form card" onSubmit={handleSubmit}>
        <div className="field" >
          <input className="input" name="username" type="text" placeholder="Nome" onChange={u => setUsername(u.target.value)} id="username" />
        </div>
        <div className="field">
          <input className="input" name="password" type="password" placeholder="Senha" id="password" onChange={p => setPassword(p.target.value)} />
        </div>
        <div className="field">
          <button className="button">Entrar</button>
        </div>
      </form>
    </div>
  )
}



export default Login