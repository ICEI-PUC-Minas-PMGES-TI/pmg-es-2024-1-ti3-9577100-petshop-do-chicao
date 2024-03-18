import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function CadastroPets() {

    // const [password, setPassword] = "teste"; /*= useState('')*/

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/login', {username, password})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit} title="CadastroPets">
                    <div>
                        <label htmlFor='nome'>Nome de usuário</label>
                        <input type='text' placeholder='Insira seu nome de usuário' /*onChange={ u => setUsername(u.target.value)}*//>
                    </div>
                    <div>
                        <label htmlFor='senha'>Senha</label>
                        <input type='password' placeholder='Insira sua senha' /*onChange={ p => setPassword(p.target.value)}*//>
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login