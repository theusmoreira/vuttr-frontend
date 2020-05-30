import React, { useState, useEffect } from 'react';

import { FaSearch, FaSignOutAlt, FaTimes } from 'react-icons/fa'

import api from '../../services/api';

import './styles.css';

function Session() {
  const [tools, setTools] = useState([]);

  async function fetchTools() {
    const response = await api.get('tools');
    setTools(response.data);
  }
  console.log(tools)

  useEffect(() => {
    fetchTools()
  }, []);


  return (
    <div className="container-session">
      <div className="content-session">
        <section>
          <div className="header-session">
            <div className="title-session">
              <h1>VUTTR</h1>
              <p>Very Useful To Remember</p>
            </div>
            <button>
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
                    <button>
                      <FaTimes />
                    remove
                  </button>
                  </div>
                  <p className="description" >{tool.description}</p>
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