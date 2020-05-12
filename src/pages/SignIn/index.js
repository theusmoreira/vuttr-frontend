import React, { Component } from 'react';
import { FaChevronRight } from 'react-icons/fa'
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';
import { login } from '../../services/auth';

import './styles.css';

class SignIn extends Component {
  state = {
    name: '',
    password: '',
    error: ''
  };

  handleSignIn = async e => {
    e.preventDefault();

    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: 'Preencha e-mail e senha para continuar!' });
    } else {
      try {
        const response = await api.post('/login', { email, password });
        login(response.data.token);
        this.props.history.push('/tools');
      } catch (error) {
        this.setState({
          error: 'Houve um problema com o login, verifique suas credenciais.'
        });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="content">
          <section className='form'>
            <form onSubmit={this.handleSignIn}>
              <h1>Sign In</h1>
              {this.state.error && <p>{this.state.error}</p>}
              <input
                type='email'
                placeholder='Seu Email'
                onChange={e => this.setState({ email: e.target.value })}
              />
              <input
                type='password'
                placeholder='Senha'
                onChange={e => this.setState({ password: e.target.value })}
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
}
export default withRouter(SignIn);