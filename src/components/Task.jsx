import React from 'react';
import '../App.css'

const Task = ({ task, onClick, onDelete }) => {
  return (
    <div className="task">
      <h4 onClick={onClick}>{task.title}</h4>
      <button onClick={onDelete}> - </button>
    </div>
  );
};

export default Task;
