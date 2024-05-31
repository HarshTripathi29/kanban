import React from 'react'
import Sidebar from './Sidebar'
import Boards from './Boards'
import '../App.css'

const Workspace = ({ workspaces, setWorkspaces }) => {
  return (
    <div>
      <div className='workspace'>
      <Sidebar workspaces={workspaces} setWorkspaces={setWorkspaces} />
      <Boards workspaces={workspaces} setWorkspaces={setWorkspaces} />
      </div>
    </div>
  )
}

export default Workspace
