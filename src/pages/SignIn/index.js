import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa'
import { Link, withRouter, useHistory } from 'react-router-dom';

import api from '../../services/api';
import { login } from '../../services/auth';

import './styles.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Fill in email and password to continue!');
    } else {
      try {
        const response = await api.post('/login', {
          email,
          password
        });

        login(response.data.token);

        history.push('/tools');

      } catch (error) {
        setError('There was a problem with the login, check your credentials.');
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
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button className='button' type='submit'>Sign In</button>
            <Link className="back-link" to="/signup">
              <FaChevronRight size={16} color='#170C3A' />
              <span>I don't have a registration</span>
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
}
export default withRouter(SignIn);