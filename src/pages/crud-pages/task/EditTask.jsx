import { useEffect, useState } from 'react'
import "../../../style/EditTask.scss"
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GetEmployeeSingleTask, ModifyTask } from '../../../components/crud/Task-CRUD';



const EditTask = () => {
  const { id, email } = useParams();

  const [data, setData] = useState({
    title: "",
    task: "",
    startDate:"",
    endDate: "",
    email: email,
    completed: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Result = await GetEmployeeSingleTask(id, email);
        if (Result && Result.length > 0) {
          setData({
            title: Result[0].title,
            task: Result[0].task,
            startDate: Result[0].startDate,
            endDate: Result[0].endDate,
            employeeEmail: email,
            completed: Result[0].completed,
          });
        }
      } catch (error) {
        toast.error("Error with Fetching the data. " + error)
      }
    }
    fetchData();

  }, [email, id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    ModifyTask(id, data);
  };

  return (
    <div className='edit-task'>
      <div className="title">
        <h1>Edit Task</h1>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input type="text" name='title' placeholder='Task Title' value={data.title} onChange={handleChange} />
          <label htmlFor="task">Task:</label>
          <textarea rows={5} cols={30} type="text" name='task' value={data.task} required placeholder='Edit Task' style={{ resize: "none" }} onChange={handleChange} />
          <label htmlFor="startDate">StartDate:</label>
          <input type="text" name='startDate' value={data.startDate} required placeholder='DD/MM/YYYY' onChange={handleChange}/>
          <label htmlFor="endDate">EndDate:</label>
          <input type="text" name='endDate' value={data?.endDate} required placeholder='DD/MM/YYYY' onChange={handleChange} />
          <input type="text" disabled value={email} />
          <select name="completed" value={data.completed} onChange={handleChange}>
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
          <button type='submit'>Edit Task</button>
        </form>
      </div>
    </div>
  )
}

export default EditTask