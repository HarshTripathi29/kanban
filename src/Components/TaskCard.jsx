import React from 'react'
import { useState } from 'react'

const TaskCard = ({id, onInputChange, name}) => {

  const [input, setInput] = useState([{name : " "}])

  const [list, setList] = useState([]);



  const handleChange=(e)=>{
    const {name, value} = e.target;
    setInput({...input, [name]:value})

    onInputChange(id, name, value)
  }



  return (

    <div>
      <div className='taskCard'>

      <h2>{name}</h2>
      {list.map((item)=>(
        <div>{item}</div>
      ))}
      <input
        type="text"
        name="name"
        value={input.name}
        placeholder='name'
        onChange={handleChange}
      />
     
        <button>add</button>
        <></>
      </div>
    </div>
  )
}

export default TaskCard
