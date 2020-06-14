import React from 'react';
import { FaTimes } from 'react-icons/fa';

import './styles.css';

function ModalRemoveTool({ onClose, onRemoveTool, getNameAndId }) {
  const { toolId, toolName } = getNameAndId;
  
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal') {
      onClose();
    }
  };

  const handleRemoveTool = () => {
    onRemoveTool(toolId);
    onClose();
  }
  return (
    <div id='modal' className="modal" onClick={handleOutsideClick}>
      <div className="container">
        <span>
          <FaTimes />
            Remove Tool
          </span>
        <div className="content">
          <p>Are you want to remove {toolName}?</p>
          <div className='btn-group'>
            <button className="button" onClick={onClose}>Cancel</button>
            <button className="button" onClick={handleRemoveTool}>Yes, remove</button>
          </div>

        </div>
      </div>
    </div >
  );
}

export default ModalRemoveTool;