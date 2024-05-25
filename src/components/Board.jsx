import React, { useState } from 'react';
import Task from './Task';
import { v4 as uuidv4 } from 'uuid';
import "../App.css"

const Board = ({ board, setBoards, boards }) => {
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask) {
      const updatedBoards = boards.map(b => 
        b.id === board.id ? { ...b, tasks: [...b.tasks, { id: uuidv4(), title: newTask }] } : b
      );
      setBoards(updatedBoards);
      setNewTask('');
    }
  };

  return (
    <div className="board">
      <h2>{board.title}</h2>
      <div className="tasks">
        {board.tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
        className='input'
      />
      <button onClick={addTask} className='btn'>Add Task</button>
    </div>
  );
};

export default Board;
