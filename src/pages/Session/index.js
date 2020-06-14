import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch, FaSignOutAlt, FaTimes } from 'react-icons/fa';

import ModalAddTool from '../../components/ModalAddTool';
import ModalRemoveTool from '../../components/ModalRemoveTool';

import api from '../../services/api';
import { logout } from '../../services/auth';

import './styles.css';

function Session() {
  const [tools, setTools] = useState([]);

  const [toolId, setToolId] = useState('');
  const [toolName, setToolName] = useState('');

  const [checkedBox, setCheckedBox] = useState(false);
  const [toolTagName, setToolTagName] = useState('');


  const [addToolModal, setAddToolModal] = useState(false);
  const [removeToolModal, setRemoveToolModal] = useState(false);

  const history = useHistory();


  async function fetchTools() {
    const response = await api.get();
    setTools(response.data);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    async function fetchToolsTagName() {
      if (checkedBox === true && toolTagName) {
        const response = await api.get('tools', {
          params: {
            tag: toolTagName
          }
        });
        setTools(response.data);
      } else {
        fetchTools()
      }
    }
    fetchToolsTagName();
  }, [checkedBox, toolTagName]);

  function handleLogout() {
    logout();
    history.push('/signin');
  };

  async function hanldeRemoveTool(id) {
    try {
      await api.delete(`tools/${id}`);
      setTools(tools.filter(tool => tool._id !== id));
    } catch (err) {
      alert('Erro ao remover tool');
    }
  };

  function openModal() {
    setAddToolModal(true)
  };

  function closeModal() {
    setAddToolModal(false)
  };

  function openRemoveToolModal(id, name) {
    setToolId(id);
    setToolName(name);
    setRemoveToolModal(true)
  };

  function closeRemoveToolModal() {
    setRemoveToolModal(false)
  };


  return (
    <div className="container-session">
      {addToolModal ? <ModalAddTool
        onClose={() => closeModal()}
        fetchTools={() => fetchTools()}
      /> : null}
      {removeToolModal ? <ModalRemoveTool
        onClose={() => closeRemoveToolModal()}
        onRemoveTool={hanldeRemoveTool}
        getNameAndId={{ toolId, toolName }}
      /> : null}
      <div className="content-session">
        <section>
          <div className="header-session">
            <div className="title-session">
              <h1>VUTTR</h1>
              <p>Very Useful To Remember</p>
            </div>
            <button onClick={() => handleLogout()}>
              <FaSignOutAlt alt='Logout icon' />
            </button>
          </div>
          <div className="search-container">
            <div className="input-checkbox">
              <FaSearch className='search-svg' size={25} alt='Search Icon' />
              <input
                type='text'
                placeholder='Fazer busca'
                value={toolTagName}
                onChange={e => setToolTagName(e.target.value)}
              />
              <div className='checkbox-container'>
                <input
                  defaultChecked={checkedBox}
                  onChange={e => setCheckedBox(e.target.checked)}
                  type="checkbox"
                  id='checkbox-tag'
                />

                <label
                  className='label-container'
                  htmlFor="checkbox-tag"
                >search in tags only
                </label>
              </div>
            </div>
            <button onClick={() => openModal()} >+Add</button>
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
                    <button onClick={() => openRemoveToolModal(tool._id, tool.title)} >
                      <FaTimes />
                    remove
                  </button>
                  </div>
                  <p className="description" >{tool.description}</p>
                  <div className="tags">
                    {tool.tags.map((tag, index) => (
                      <p className={checkedBox && toolTagName === tag ? 'selected' : ''} key={index}> #{tag}</p>
                    ))}
                  </div>
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