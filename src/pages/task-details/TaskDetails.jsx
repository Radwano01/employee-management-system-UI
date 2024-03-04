import React, { useEffect, useState } from 'react'
import "../../style/TaskDetails.scss"
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GetEmployeeSingleTask } from '../../components/crud/Task-CRUD';

const TaskDetails = () => {
    const { id, email } = useParams();
    const [data, setData] = useState([]);
    console.log(data)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const Result = await GetEmployeeSingleTask(id, email);
            if (Result && Result.length > 0) {
              setData([{
                title: Result[0].title,
                task: Result[0].task,
                startDate: Result[0].startDate,
                endDate: Result[0].endDate,
                employeeEmail: email,
                completed: Result[0].completed,
              }]);
            }
          } catch (error) {
            toast.error("Error with Fetching the data. " + error)
          }
        }
        fetchData();
    
      }, [email, id])

  return (
    <div className='task-details'>
        <div className="title">
            <h1>TASK DETAILS</h1>
        </div>
        <div className="task-detail">
            {data &&
                data?.map((data)=>{
                    return(
                        <div className='details' key={data.id}>
                            <h3>Task Title: {data.title}</h3>
                            <h3>Task Detail: {data.task}</h3>
                            <h3>Task Start Date: {data.startDate}</h3>
                            <h3>Task End Date: {data.endDate}</h3>
                            <h3>Task Status: {data.completed}</h3>
                        </div>
                    )
                })
            
            }
        </div>
    </div>
  )
}

export default TaskDetails