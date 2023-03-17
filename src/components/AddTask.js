import React from 'react'
import { useState } from 'react'


const AddTask = ({onAdd}) => {
    const [text, setText]=useState('')
    const [day, setDay]=useState('')
    const [reminder, setReminder]=useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!text) {
          alert('Please add a task')
          return
        }
    
        onAdd({ text, day, reminder })
    
        setText('')
        setDay('')
        setReminder(false)
    }
    
  return (
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Add to your day' value={text} onChange={(event)=>setText(event.target.value)}/>
        </div>

        <div className='form-control'>
            <label>Day&Time</label>
            <input type='text' placeholder='Add when?' value={day} onChange={(e)=>setDay(e.target.value)}/>
        </div>

        <div className='form-control form-control-check'>
            <label>Set Reminder</label>
            <input type='checkbox' value={reminder} checked={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)} />
        </div>

        <input type='submit' value='Save it!' className='btn btn-block'/>
      </form>
  )
}

export default AddTask
