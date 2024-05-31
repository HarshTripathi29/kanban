import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from './Board';
import BoardModal from './BoardModal';
import Sidebar from './Sidebar';
import { v4 as uuidv4 } from 'uuid';
import '../App.css'

const Boards = ({ workspaces, setWorkspaces }) => {
  const { workspaceId } = useParams();
  const currentWorkspace = workspaces.find(ws => ws.id === parseInt(workspaceId));
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const addBoard = (board) => {
    const newBoard = { id: uuidv4(), title: board.title, description: board.description, tasks: [] };
    const updatedWorkspace = {
      ...currentWorkspace,
      boards: [...currentWorkspace.boards, newBoard],
    };
    setWorkspaces(workspaces.map(ws => ws.id === currentWorkspace.id ? updatedWorkspace : ws));
    closeModal();
  };

  if (!currentWorkspace) {
    return <div>Please select a workspace</div>;
  }

  return (
    <div className="boards">
    <div>
      <Sidebar workspaces={workspaces} setWorkspaces={setWorkspaces} />
    </div>
    <div>
    <div className='boardsHeader'>
      <h2>{currentWorkspace.title}</h2>
      <button onClick={openModal} className='board-button'>Add Board</button>
      </div>
      <div className='boardsContainer'>
      {currentWorkspace.boards.map(board => (
        <Board
          key={board.id}
          board={board}
          workspaces={workspaces}
          setWorkspaces={setWorkspaces}
          currentWorkspace={currentWorkspace.id}
        />
      ))}
     
      <BoardModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSave={addBoard}
      />
      </div>
      </div>
    </div>
  );
};

export default Boards;
