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
      setError('Fill in all the data to register');
    } else {
      try {
        const response = await api.post('users', { name, email, password });
        login(response.data.token);
        history.push('/tools');
      } catch (error) {
        setError('There was an error registering your account. :-/');
      }
    }
  }


  return (
    <div className="container-signup">
      <div className="content-signup">
        <section>
          <h1>Register</h1>
          <p>Make your registration and always remember your most used tools</p>
          <Link className='back-link' to='/'>
            <FaChevronLeft size={25} color='#170C3A' />
            <span>Sign In</span>
          </Link>

          <form onSubmit={handleRegister}>
            {error && <p>{error}</p>}
            <input
              placeholder='Your name'
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
              placeholder='Password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className='button' type='submit'>Register</button>
          </form>
        </section>
      </div>
    </div>
  )
};

export default withRouter(SignUp);