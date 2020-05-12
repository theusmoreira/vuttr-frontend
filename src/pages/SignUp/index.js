import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa'

import api from '../../services/api';
import { login } from '../../services/auth';

import './styles.css'

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: ""
  }

  handleRegister = async e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    if (!name || !email || !password) {
      this.setState({ error: 'Preencha todos os dados para se cadastrar' });
    } else {
      try {
        const response = await api.post('users', {name, email, password});
        login(response.data.token);
        this.props.history.push('/tools');
      } catch (error) {
        console.log(error);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="content">
          <section>
            <h1>Cadastro</h1>
            <p>Faça seu cadastro e sempre se lembre da suas ferramentas mais usadas</p>
            <Link className='back-link' to='/signin'>
              <FaChevronLeft size={25} color='#170C3A' />
              <span>Fazer login</span>
            </Link>

            <form onSubmit={this.handleRegister}>
            {this.state.error && <p>{this.state.error}</p>}
              <input
                placeholder='Seu nome'
                onChange={e => this.setState({ name: e.target.value })}
              />
              <input
                placeholder='Email'
                onChange={e => this.setState({ email: e.target.value })}
              />
              <input
                placeholder='Senha'
                type='password'
                onChange={e => this.setState({ password: e.target.value })}
              />
              <button className='button' type='submit'>Cadastrar</button>
            </form>
          </section>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp);