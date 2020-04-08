import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsApp] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");

    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try {
            const response = await api.post('/ongs', data);
            alert(`Seu ID foi cadastrado com sucesso: ${response.data.id}`);
            history.push('/');
        } catch (e) {
            alert('Erro no cadastro, tente novamente mais tarde.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link " to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input type="text"
                        placeholder="Titulo da ONG"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="tel"
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={(e) => setWhatsApp(e.target.value)}
                    />

                    <div className="input-group">
                        <input type="text"
                            placeholder="Cidade"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input type="text"
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
