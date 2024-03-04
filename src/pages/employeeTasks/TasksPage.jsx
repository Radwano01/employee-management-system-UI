import { useEffect, useState } from "react";
import '../../style/TasksPage.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteTask, GetEmployeeTasks } from '../../components/crud/Task-CRUD';
import { toast } from 'react-toastify';


const TasksPage = () => {
  const [data, setData] = useState([]);
  const { email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Result = await GetEmployeeTasks(email);
        if (Result) {
          const data = Result.filter((data)=> data.completed === "false");
          setData(data);
        }
      } catch (error) {
        toast.info("No Task for this employee yet! ")
      }
    }
    fetchData();
  }, [email])

  const handleCompletedTask = (id) => {
    navigate(`/homepage/edit-task/${id}/${email}`);
  }

  const handleNavigation = () => {
    navigate(`/homepage/add-task/${email}`)
  }

  const toggleDelete = (id)=>{
    DeleteTask(id);
  }

  const handleNavigateToTaskDetails = (id)=>{
    navigate(`/homepage/task-details/${id}/${email}`)
  }

  return (
    <div className='task-page'>
      <div className="title">
        <h1>EMPLOYEE TASK PAGE</h1>
      </div>
      <div className="sorts">
        <button onClick={() => handleNavigation()}>Add New Task</button>
      </div>
      <div className="list">
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((task, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.startDate}</td>
                    <td>{task.endDate}</td>
                    <td style={{ color: task.completed === "true" ? "green" : "red" }}>{task.completed}</td>
                    <td>
                      <button style={{ background: "#3498db", color: "#ffffff" }} onClick={() => handleCompletedTask(task.id)}>Edit</button>
                      <button style={{ background: "#e74c3c", color: "#ffffff" }} onClick={() => toggleDelete(task.id)}>Delete</button>
                      <button style={{ background: "green", color:"white", cursor: "pointer" }} onClick={()=> handleNavigateToTaskDetails(task.id)}>View</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TasksPage