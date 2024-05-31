import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../App.css'

Modal.setAppElement('#root');

const TaskModal = ({ isOpen, onRequestClose, onSave, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.date);
    } else {
      setTitle('');
      setDescription('');
      setDate('');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, date });
  };

  return (
    <div className='taskModal'>
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Task Modal" className='modal'>
      <h3>{task ? 'Edit Task' : 'Add Task'}</h3>
      <form onSubmit={handleSubmit}>
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
        <div className='form-entry'>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className='modal-input'
          />
        </div>
        <button type="submit" className='modalBtn'>{task ? 'Save Changes' : 'Add Task'}</button>
        <button type="button" onClick={onRequestClose} className='modalBtn'>Cancel</button>
      </form>
    </Modal>
    </div>
  );
};

export default TaskModal;
