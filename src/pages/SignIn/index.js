import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa'
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';
import { login } from '../../services/auth';

import './styles.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async e => {
    e.preventDefault();

    if (!email || !password) {
      setError('Preencha e-mail e senha para continuar!');
    } else {
      try {
        const response = await api.post('/login', { email, password });
        login(response.data.token);
        this.props.history.push('/tools');
      } catch (error) {
        setError('Houve um problema com o login, verifique suas credenciais.'
        );
      }
    }
  };

  return (
    <div className="container-signin">
      <div className="content-signin">
        <section className='form'>
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            {error && <p>{error}</p>}
            <input
              type='email'
              placeholder='Seu Email'
              onChange={e => setEmail({ email: e.target.value })}
            />
            <input
              type='password'
              placeholder='Senha'
              onChange={e => setPassword({ password: e.target.value })}
            />
            <button className='button' type='submit'>Entrar</button>
            <Link className="back-link" to="/signup">
              <FaChevronRight size={16} color='#170C3A' />
              <span>Não tenho cadastro</span>
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
}
export default withRouter(SignIn);