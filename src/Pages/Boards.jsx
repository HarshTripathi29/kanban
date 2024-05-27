import React from 'react'
import './App.css'
import BoardCard from '../Components/BoardCard'

const Boards = () => {
  return (
    <div>
      <div className='BoardContainer'>
      <h3>Boards</h3>
       <BoardCard/>
      </div>
    </div>
  )
}

export default Boards
