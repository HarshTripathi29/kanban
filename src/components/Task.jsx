import React from 'react';
import "../App.css"

const Task = ({ task }) => {
  return (
    <div className="task">
      <p>{task.title}</p>
    </div>
  );
};

export default Task;
