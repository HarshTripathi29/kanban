import React, { useState } from 'react';
import Task from './Task';
import TaskModal from './TaskModal';
import { v4 as uuidv4 } from 'uuid';
import '../App.css'

const Board = ({ board, setWorkspaces, workspaces, currentWorkspace }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const openModal = (task = null) => {
    setCurrentTask(task);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setCurrentTask(null);
    setModalIsOpen(false);
  };

  const addOrUpdateTask = (task) => {
    let updatedTasks;
    if (currentTask) {
      updatedTasks = board.tasks.map(t => t.id === currentTask.id ? { ...t, ...task } : t);
    } else {
      const newTask = { id: uuidv4(), ...task };
      updatedTasks = [...board.tasks, newTask];
    }

    const updatedBoards = workspaces.map(ws => {
      if (ws.id === currentWorkspace) {
        return {
          ...ws,
          boards: ws.boards.map(b => b.id === board.id ? { ...b, tasks: updatedTasks } : b)
        };
      }
      return ws;
    });

    console.log('Updated boards after adding/updating task:', updatedBoards); // Debug log
    setWorkspaces(updatedBoards);
    closeModal();
  };

  const deleteTask = (taskId) => {
    console.log('Deleting task with id:', taskId); // Debug log

    const updatedTasks = board.tasks.filter(t => t.id !== taskId);
    console.log('Updated tasks:', updatedTasks); // Debug log

    const updatedBoards = workspaces.map(ws => {
      if (ws.id === currentWorkspace) {
        return {
          ...ws,
          boards: ws.boards.map(b => b.id === board.id ? { ...b, tasks: updatedTasks } : b)
        };
      }
      return ws;
    });

    console.log('Updated boards after deleting task:', updatedBoards); // Debug log
    setWorkspaces(updatedBoards);
  };

  const deleteBoard = () => {
    const updatedWorkspace = workspaces.find(ws => ws.id === currentWorkspace);
    const updatedBoards = updatedWorkspace.boards.filter(b => b.id !== board.id);

    const updatedWorkspaces = workspaces.map(ws => {
      if (ws.id === currentWorkspace) {
        return { ...ws, boards: updatedBoards };
      }
      return ws;
    });

    console.log('Updated workspaces after deleting board:', updatedWorkspaces); // Debug log
    setWorkspaces(updatedWorkspaces);
  };

  return (
    <div className="board">
      <div className="board-header">
        <h3>{board.title}</h3>
        <button onClick={deleteBoard} className='-button'>-</button>
      </div>
      
    <div className='boardContainer'>
    <p>{board.description}</p>
      <div className="tasks">
        {board.tasks.map(task => (
          <Task key={task.id} task={task} onClick={() => openModal(task)} onDelete={() => deleteTask(task.id)} />
        ))}
      </div>
      <button onClick={() => openModal()} className='modalBtn'>Add Task</button>
      <TaskModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSave={addOrUpdateTask}
        task={currentTask}
      />
      </div>
    </div>
  );
};

export default Board;
