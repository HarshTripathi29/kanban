import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Sidebar = ({ workspaces, setWorkspaces, setCurrentWorkspace }) => {
  const [newWorkspace, setNewWorkspace] = useState('');

  const addWorkspace = () => {
    if (newWorkspace) {
      const workspace = { id: Date.now(), title: newWorkspace, boards: [] };
      setWorkspaces([...workspaces, workspace]);
      setNewWorkspace('');
    }
  };

  return (
    <div className="sidebar">
      <h2>Workspaces</h2>
      <ul>
        {workspaces.map(workspace => (
          <li key={workspace.id} onClick={() => setCurrentWorkspace(workspace.id)}>
            <Link to={`/workspace/${workspace.id}`}>{workspace.title}</Link>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newWorkspace}
        onChange={(e) => setNewWorkspace(e.target.value)}
        placeholder="New Workspace"
        className='sidebarInput'
      />
      <button onClick={addWorkspace} className='sidebarBtn'>+</button>
    </div>
  );
};

export default Sidebar;
