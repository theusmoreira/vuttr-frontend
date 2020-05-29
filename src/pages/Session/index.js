import React, { useState, useEffect } from 'react';

import { FaSearch, FaSignOutAlt } from 'react-icons/fa'

import api from '../../services/api';
import { logout } from '../../services/auth';

import './styles.css';

function Session() {
  const [tools, setTools] = useState([]);
  const [searchTool, setSearchToll] = useState('');


  useEffect(() => {
    async function loadTools() {
      const response = await api.get('tools');
      setTools(response.data);
    }
    async function searchToollResquest() {
      const response = await api.get(`tools?tag=${searchTool}`)
      setSearchToll(response)
    }
    searchToollResquest();
    loadTools();
  });

  return (
    <div className="container-session">
      <div className="content-session">
        <section>
          <div className="header">
            <h1>VUTTR</h1>
            <p>Very Useful To Remember</p>
            <FaSignOutAlt  onClick={logout()} className='logout-svg' alt='Logout icon' />
          </div>
          <div className="search-container">
            <FaSearch className='search-svg' size={25} alt='Search Icon' />
            <input
              type='text'
              placeholder='Fazer busca'
              onChange={e => setSearchToll(e.target.value)}
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
            <button>+Add</button>
          </div>
          <div className="list-content">
            <ul>
              {tools.map(tool => (
                <li key={tool._id}>
                  <h3>
                    <a href={tool.link}>
                      {tool.link}
                    </a>
                  </h3>
                  <span>{tool.description}</span>
                  <p>{tool.tags.map(tags => (<i key={tags[0]}>#{tags} </i>))}</p>
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