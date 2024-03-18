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
                        <label htmlFor='nome'>Nome do Pet</label>
                        <input type='text' placeholder='Insira seu nome de usuário' /*onChange={ u => setUsername(u.target.value)}*//>
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}

export default CadastroPets