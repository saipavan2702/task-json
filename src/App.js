import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";


function App() {
  const [showAdd,setShowAdd]=useState(false)
  const [tasks, setTasks]=useState([])

  useEffect(()=>{
    const getTasks=async()=>{
      const tasksfromServer=await fetchTasks()
      setTasks(tasksfromServer)
    }
    getTasks();
  },[])

  const fetchTasks=async()=>{
    const res=await fetch('http://localhost:5000/tasks')
    const data= await res.json()
    return data
  }

  const fetchTask=async(id)=>{
    const res=await fetch(`http://localhost:5000/tasks/${id}`)
    const data= await res.json()
    return data
  }

  const addTask=async(task)=>{
    const res=await fetch(`http://localhost:5000/tasks`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(task)
    })
    const data=await res.json();
    setTasks([...tasks,data]);

    // const id=Math.floor(Math.random()*100000)+1;
    // const newTask={id,...task};
    // setTasks([...tasks,newTask]);
  }
  
  const deleteTask=async(id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE'
    })
    setTasks(tasks.filter((task)=> task.id!==id))
  }

  const toggleRem=async(id)=>{
    const taskToggle=await fetchTask(id)
    const updTask={...taskToggle,reminder:!taskToggle.reminder}
    const res=await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(updTask)
    })

    const data=await res.json()
    setTasks(tasks.map((task)=>
      task.id===id?{...task,reminder:data.remiander}:task)
    )
  }

  return (
    <div className="container">
      <Header onAdd={()=>setShowAdd(!showAdd)}  textinAdd={showAdd} />
      {showAdd && <AddTask onAdd={addTask}/>}
      {tasks.length>0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleRem} />) : ('Lazy day🥱.....!!')}
    </div>
  );
}

export default App;
