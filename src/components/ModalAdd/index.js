import React from 'react';

import { FaPlus } from 'react-icons/fa';

import  './styles.css';

function ModalAdd() {
  return (
    <div className="modal">
      <div className="container">
        <span>
          <FaPlus />
          Add New Tool
        </span>
        <div className="content">
          <form >
            <label htmlFor="tool-name" >Tool Name</label>
            <input 
            id="tool-name" 
            type="text" 
            placeholder="Ex: Notion" />

            <label htmlFor="tool-link" >Tool Link</label>
            <input 
            id="tool-link" 
            type="text" 
            placeholder="Ex: https://www.notion.so" />

            <label htmlFor="tool-name" >Tool Description</label>
            <input
              id="tool-description"
              type="textarea"
              placeholder="Ex: A new tool that blends your everyday work apps into one. 
              It's the all-in-one workspace for you and your team."/>

              <label htmlFor="tool-tags">Tags</label>
              <input
              id="tool-tags"
              type="text"
              placeholder="Ex: Tasks, Tool, Work"
              />

              <button className="button" type="submit">Add Tool</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalAdd;