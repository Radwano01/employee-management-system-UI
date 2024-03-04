import React, { useEffect, useState } from 'react'
import "../../style/Achievement.scss"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GetEmployeeTasks } from '../../components/crud/Task-CRUD';
import { FaEdit } from "react-icons/fa";

const Achievement = () => {

    const [data, setData] = useState([]);
    const { email } = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const Result = await GetEmployeeTasks(email);
            if (Result) {
            const data = Result.filter((data)=> data.completed === "true");
            setData(data);
            }
        } catch (error) {
            toast.error("Error with Fetching the data. " + error)
        }
        }
        fetchData();
    }, [email])

    const handleCompletedTask = (id) => {
        navigate(`/homepage/edit-task/${id}/${email}`);
    }

    return (
        <div className='achievement'>
            <div className="title">
                <h1>EMPLOYEE ACHIEVEMENT PAGE</h1>
            </div>
            <div className="list">
                <table>
                    <thead>
                        <tr>
                        <th>Index</th>
                        <th>Task</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 &&
                            data.map((task, index) => {
                                return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className='task-td'>{task.task}</td>
                                    <td>{task.startDate}</td>
                                    <td>{task.endDate}</td>
                                    <td style={{ color: task.completed === "true" ? "green" : "red" }}>{task.completed}</td>
                                    <td><button onClick={() => handleCompletedTask(task.id)}><FaEdit size={20} /></button></td>
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

export default Achievement