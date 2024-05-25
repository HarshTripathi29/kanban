import React, { useState } from 'react';
import "../App.css"

const Header = ({ addBoard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const handleAddBoard = () => {
    if (newBoardTitle) {
      addBoard(newBoardTitle);
      setNewBoardTitle('');
      setIsModalOpen(false);
    }
  };

  return (
    <header>
      <h2>Kanban Board</h2>
      <button onClick={() => setIsModalOpen(true)} className='btnHeader'>Add Board</button>
      {isModalOpen && (
        <div className="modal">
          <input
            type="text"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            placeholder="Board Title"
            className='input'
          />
          <button onClick={handleAddBoard} className='btn'>Add</button>
          <button onClick={() => setIsModalOpen(false)} className='btn'>Cancel</button>
        </div>
      )}
    </header>
  );
};

export default Header;
