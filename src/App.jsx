import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Boards from './Pages/Boards'
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import Task from './Pages/Task'

function App() {
  
  return (
    <>
    <Router>
      <Routes>
      <Route path='/board' element= <Boards/>/>
      <Route path='/task' element=<Task/>/>
      </Routes>
    </Router>      
    </>
  )
}

export default App
