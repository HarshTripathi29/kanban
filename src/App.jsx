import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Boards from './components/Boards';
import Homepage from './components/Homepage'
import Workspace from './components/Workspace';
import LoginPage from './components/LoginPage';
import './App.css'

const App = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [tasks, setTasks] = useState([]);

  return (
    <Router>
      <div className="App">
        
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Homepage  
              workspaces={workspaces} 
              setWorkspaces={setWorkspaces} 
              tasks={tasks} 
              setTasks={setTasks}/>}
            />
            <Route 
              path="/login"
              element={<LoginPage/>}
            />
            <Route 
              path="/workspace" 
              element={<Workspace workspaces={workspaces} setWorkspaces={setWorkspaces}/>}/>
            <Route
              path="/workspace/:workspaceId"
              element={<Boards workspaces={workspaces} setWorkspaces={setWorkspaces} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
