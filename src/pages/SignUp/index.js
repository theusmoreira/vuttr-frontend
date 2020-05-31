import React, { useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa'

import api from '../../services/api';
import { login } from '../../services/auth';

import './styles.css'

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleRegister = async e => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Preencha todos os dados para se cadastrar');
    } else {
      try {
        const response = await api.post('users', { name, email, password });
        login(response.data.token);
        history.push('/tools');
      } catch (error) {
        setError('Ocorreu um erro ao registrar sua conta. :-/');
      }
    }
  }


  return (
    <div className="container-signup">
      <div className="content-signup">
        <section>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro e sempre se lembre da suas ferramentas mais usadas</p>
          <Link className='back-link' to='/'>
            <FaChevronLeft size={25} color='#170C3A' />
            <span>Fazer login</span>
          </Link>

          <form onSubmit={handleRegister}>
            {error && <p>{error}</p>}
            <input
              placeholder='Seu nome'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              placeholder='Email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              placeholder='Senha'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className='button' type='submit'>Cadastrar</button>
          </form>
        </section>
      </div>
    </div>
  )
};

export default withRouter(SignUp);