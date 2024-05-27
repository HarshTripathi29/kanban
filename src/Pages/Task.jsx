import React, { useState } from 'react'
import './App.css'
import TaskContainer from '../Components/TaskContainer'
import TaskCard from '../Components/TaskCard';

const Task = () => {

  const[card, setCard] = useState([{key:1, name : "todo", description : "dummy"}]);

  const handleClick=()=>{
    const newCard=[
     {
      id : card.length+1,
      name : " ",
      description : " ",
     } 
    ];
    setCard([...card, newCard]);
  }

  const handleInputChange=(id, name, value)=>{
    setCard((prevCard)=>{
      prevCard.map((card)=>(
        card.id==id?{...card, [name]:value}:card
      ))
    });
  };

  return (
    <div>
      <div className='taskPage'>
      <div className='taskHeading'>
      <h1>Heading</h1>
      <button onClick={handleClick}>Add Section</button>
      </div>
      <div className='taskContainer'> 
      {(card) &&     
      (card.map((card)=>(
        <TaskCard 
         key={card.id}
         id={card.id}
         onInputChange={handleInputChange}
         name={card.name}
        />
      )))
      }
      </div>
      </div>
    </div>
  )
}

export default Task
