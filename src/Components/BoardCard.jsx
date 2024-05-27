import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
const BoardCard = () => {
  return (
    <div>
      <div className='cardContainer'>
        <div className='heading'>GLA</div>
        <div className='description'>4 years wasted</div>
        <Link to='/task'><button>add</button></Link>
      </div>
    </div>
  )
}

export default BoardCard
