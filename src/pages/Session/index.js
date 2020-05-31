import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch, FaSignOutAlt, FaTimes } from 'react-icons/fa';

import api from '../../services/api';
import { logout } from '../../services/auth';

import './styles.css';

function Session() {
  const [tools, setTools] = useState([]);

  const history = useHistory();

  async function fetchTools() {
    const response = await api.get('tools');
    setTools(response.data);
  };

  useEffect(() => {
    fetchTools()
  }, []);

  const handleLogout = () => {
    logout();
    history.push('/signin');
  };

  async function hanldeRemoveTool(id) {
    try {
      await api.delete(`tools/${id}`);
      setTools(tools.filter(tool => tool._id !== id))
    } catch (err) {
      alert('Erro ao remover tool')
    }
  }

  return (
    <div className="container-session">
      <div className="content-session">
        <section>
          <div className="header-session">
            <div className="title-session">
              <h1>VUTTR</h1>
              <p>Very Useful To Remember</p>
            </div>
            <button onClick={handleLogout}>
              <FaSignOutAlt alt='Logout icon' />
            </button>
          </div>
          <div className="search-container">
            <div className="input-checkbox">
              <FaSearch className='search-svg' size={25} alt='Search Icon' />
              <input
                type='text'
                placeholder='Fazer busca'
              />
              <div className='checkbox-container'>
                <input
                  type="checkbox"
                  id='checkbox-tag'
                />

                <label
                  className='label-container'
                  htmlFor="checkbox-tah"
                >search in tags only
                </label>
              </div>
            </div>
            <button>+Add</button>
          </div>
          <div className="list-content">
            <ul>
              {tools.map(tool => (
                <li key={tool._id}>
                  <div className="headerList">
                    <a
                      href={tool.link}
                      rel="noopener noreferrer"
                      target="_blank">
                      <h3>{tool.title}</h3>
                    </a>
                    <button  onClick={() => hanldeRemoveTool(tool._id)} >
                      <FaTimes />
                    remove
                  </button>
                  </div>
                  <p className="description" >{tool.description}</p>
                  <p>{tool.tags.map((tag, index) => (<i key={index}>#{tag} </i>))}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Session;