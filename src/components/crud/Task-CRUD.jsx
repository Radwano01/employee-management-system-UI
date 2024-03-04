import axios from 'axios'
import { toast } from 'react-toastify'

export const CreateTask = async(data) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_EMPLOYEE_TASK_API}/add-new-task`,{
            title:data.title,
            task:data.task,
            startDate:data.startDate,
            endDate:data.endDate,
            employeeEmail:data.email,
            completed:data.completed,
        })
        if(response){
            toast.success("Task Added Successfully");
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error);
    }
}

export const GetTask = async() => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_EMPLOYEE_TASK_API}/get-all-tasks`)
        if(response && response.data){
            return response.data;
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error);
    }
}

export const GetEmployeeTasks = async(email) => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_EMPLOYEE_TASK_API}/get-employee-tasks/${email}`)
        if(response && response.data){
            return response.data;
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error)
    }
}

export const GetEmployeeSingleTask = async(id,email) => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_EMPLOYEE_TASK_API}/get-employee-single-task/${id}/${email}`)
        if(response && response.data){
            return response.data;
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error)
    }
}



export const ModifyTask = async(id,data) => {
    try{
        const response = await axios.put(`${process.env.REACT_APP_EMPLOYEE_TASK_API}/edit-task/${id}`,{
            title:data.title,
            task:data.task,
            startDate:data.startDate,
            endDate:data.endDate,
            employeeEmail:data.employeeEmail,
            completed:data.completed,
        })
        if(response){
            toast.success("Task Updated Successfully")
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error);
        console.log(error)
    }
}


export const DeleteTask = async(id) => {
    try{
        const response = await axios.delete(`${process.env.REACT_APP_EMPLOYEE_TASK_API}/delete-task/${id}`)
        if(response){
            toast.success("Task Deleted Successfully");
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error);
    }
}




