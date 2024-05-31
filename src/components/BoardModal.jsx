import React, { useState } from 'react';
import Modal from 'react-modal';
import '../App.css';

Modal.setAppElement('#root');

const BoardModal = ({ isOpen, onRequestClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <div className='boardModal'>
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Board" className='modal'>
      <h2>Add Board</h2>
      <form onSubmit={handleSubmit} className='modalForm'>
        <div className='form-entry'>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='modal-input'
          />
        </div>
        <div className='form-entry'>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='modal-input'
          />
        </div>
        <button type="submit" className='modalBtn'>Add Board</button>
        <button type="button" className='modalBtn'onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
    </div>
  );
};

export default BoardModal;
