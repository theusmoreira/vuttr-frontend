import React, { useState } from 'react';

import { FaPlus } from 'react-icons/fa';

import api from '../../services/api';
import './styles.css';

function ModalAddTool ({onClose, fetchTools}) {
  const [toolName, setToolName] = useState('');
  const [toolLink, setToolLink] = useState('');
  const [toolDescription, setToolDescription] = useState('');
  const [toolTags, setToolTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post('tools', {
      title: toolName,
      link: toolLink,
      description: toolDescription,
      tags: toolTags
    });
    onClose();
    fetchTools();
  };

  const handleOutsideClick = (e) => {
    if(e.target.id === 'modal') {
      onClose();
    }
  };

  return (
    <div id="modal" className="modal" onClick={handleOutsideClick}>
      <div className="container-remove-tool">
        <span>
          <FaPlus />
          Add New Tool
        </span>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <label htmlFor="tool-name" >Tool Name</label>
            <input
              id="tool-name"
              type="text"
              placeholder="Ex: Notion"
              value={toolName}
              onChange={e => setToolName(e.target.value)}
            />

            <label htmlFor="tool-link" >Tool Link</label>
            <input
              id="tool-link"
              type="text"
              placeholder="Ex: https://www.notion.so"
              value={toolLink}
              onChange={e => setToolLink(e.target.value)}
            />

            <label htmlFor="tool-name" >Tool Description</label>
            <textarea
              id="tool-description"
              type="text"
              placeholder="Ex: A new tool that blends your everyday work apps into one. 
              It's the all-in-one workspace for you and your team."
              value={toolDescription}
              onChange={e => setToolDescription(e.target.value)}
              />

            <label htmlFor="tool-tags">Tags</label>
            <input
              id="tool-tags"
              type="text"
              placeholder="Ex: Tasks, Tool, Work"
              value={toolTags}
              onChange={e => setToolTags(e.target.value)}
            />

            <button className="button" type="submit">Add Tool</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalAddTool;