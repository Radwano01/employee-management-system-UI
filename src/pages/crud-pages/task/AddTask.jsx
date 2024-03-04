import React, { useState } from 'react'
import "../../../style/AddTask.scss"
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { CreateTask } from '../../../components/crud/Task-CRUD';

const AddTask = () => {
    const {email} = useParams();
    const [data,setData] = useState({
        title:"",
        task:"",
        startDate:"",
        endDate:"",
        email:email,
        completed:"false",
        
    })
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setData({...data, [name]:value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        try{
            CreateTask(data)
        }catch(error){
            toast.error("Error with Posting the New Task. "+error)
        }
    }
    return (
    <div className='add-task'>
        <div className="title">
            <h1>Add Task</h1>    
        </div>
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" name='title' placeholder='Task Title' onChange={handleChange}/>
                <label htmlFor="task">Task:</label>
                <textarea rows={5} cols={30} type="text" name='task' required placeholder='New Task' style={{resize:"none"}} onChange={handleChange}/>
                <label htmlFor="startDate">StartDate:</label>
                <input type="text" name='startDate' required placeholder='DD/MM/YYYY' onChange={handleChange}/>
                <label htmlFor="enddate">EndDate:</label>
                <input type="text" name='endDate' required placeholder='DD/MM/YYYY' onChange={handleChange}/>
                <input type="text" disabled value={email}/>
                <button type="submit">Add New Task</button>
            </form>
        </div>
    </div>
  )
}

export default AddTask