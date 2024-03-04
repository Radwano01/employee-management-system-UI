import React, { useEffect, useState } from 'react';
import "../../style/Calendar.scss";
import { GetEmployeeTasks } from '../../components/crud/Task-CRUD';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



const Calendar = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Result = await GetEmployeeTasks(email);
                if (Result) {
                    setTasks(Result);
                }
            } catch (error) {
                toast.error("Error with fetching the tasks");
            }
        };
        fetchData();
    }, []);

    const month = new Date().getMonth() + 1;
    const numberOfDays = new Date(2024, month, 0).getDate();
    const dates = Array.from({ length: numberOfDays }, (_, i) => i + 1);
    const getDaysStartingFromFirstDay = () => {
        const firstDayOfMonth = new Date(2024, month, 0).getDay();
        const daysStartingFromFirstDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const rotatedDays = [...daysStartingFromFirstDay.slice(firstDayOfMonth), ...daysStartingFromFirstDay.slice(0, firstDayOfMonth)];

        return rotatedDays;
    };

    const days = getDaysStartingFromFirstDay();

    const isDateInRange = (task, date) => {
        const formattedStartDate = `${task?.startDate?.slice(6, 10)}-${task.startDate.slice(3, 5)}-${task.startDate.slice(0, 2)}`;
        const formattedEndDate = `${task?.endDate?.slice(6, 10)}-${task.endDate.slice(3, 5)}-${task.endDate.slice(0, 2)}`;
        const startDate = new Date(formattedStartDate);
        const endDate = new Date(formattedEndDate);

        const currentDate = new Date(`2024-02-${date}`);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        return currentDate.getTime() >= startDate?.getTime() && currentDate?.getTime() <= endDate?.getTime();
    };

    const handleNavigateToTaskDetails = (id)=>{
        navigate(`/homepage/task-details/${id}/${email}`)
    }

    return (
        <div className="calendar">
            <table>
                <thead>
                    <tr>
                        {days.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {dates.map(date => (
                            <td key={date}>
                                {date}
                                {tasks.map((task, index) => (
                                    <div key={index} style={{ fontSize: 12 }}>
                                        {task && isDateInRange(task, date) && (
                                            <button className='task' onClick={()=>handleNavigateToTaskDetails(task.id)}>
                                                {index + 1}-{task.title}
                                            </button>
                                        )}
                                    </div>
                                ))}

                            </td>
                        ))}

                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
