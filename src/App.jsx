import React, { useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import { v4 as uuidv4 } from 'uuid';
import "./App.css"

function App() {
  const [boards, setBoards] = useState([]);

  const addBoard = (title) => {
    setBoards([...boards, { id: uuidv4(), title, tasks: [] }]);
  };

  return (
    <div className="App">
      <Header addBoard={addBoard}/>
      <div className="board-container">
        {boards.map(board => (
          <Board key={board.id} board={board} setBoards={setBoards} boards={boards} />
        ))}
      </div>
    </div>
  );
}

export default App;



/* / src
├── components/
│   ├── Board.js
│   ├── Task.js
│   ├── Header.js
│   └── AddBoardModal.js
├── App.js
└── index.js
*/
