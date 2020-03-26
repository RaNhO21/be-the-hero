import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import './styles.css';

function Login() {
    const [id, setId] = useState("");
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('/sessions', { id });
            alert(`Bem vindo ${response.data.name} !!!`);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (e) {
            alert("Erro ao efetuar login, tente novamente mais tarde !!!");
        }

    }

    return (
        <div className="login-container">
            <section className="form">
            <img src={logoImg} alt="Be the hero"/>
                <form onSubmit={handleLogin}>

                    <h1>Faça seu login</h1>

                    <input type="text"
                        placeholder="Seu ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link " to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}

export default Login;
