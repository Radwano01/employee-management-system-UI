import { toast } from "react-toastify"
import axios from "axios"


export const CreateEmployee = async(data) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_EMPLOYEE_MANAGEMENT_API}/add-new-employee`, {
            name:data.name,
            surname:data.surname,
            email:data.email,
            salary:data.salary,
            level:data.level,
            field:data.field,
            role:"EMPLOYEE",
            password:data.password,
        });
        if(response){
            toast.success("New Employee Added");
        }
    }catch(error){
        toast.error("An error occurred, Please try again later.");
        console.log(error)
    }
}

export const ModifyEmployee = async(id,data) => {
    try{
        const response = await axios.put(`${process.env.REACT_APP_EMPLOYEE_MANAGEMENT_API}/edit-employee-information/${id}`, {
            name:data.name,
            surname:data.surname,
            email:data.email,
            salary:data.salary,
            level:data.level,
            field:data.field,
            role:"EMPLOYEE",
            password:data.password,
        });
        if(response){
            toast.success("Employee Information updated");
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error);
    }
}

export const DeleteEmployee = async(id) => {
    try{
        const response = await axios.delete(`${process.env.REACT_APP_EMPLOYEE_MANAGEMENT_API}/delete-employee-information/${id}`);
        if(response){
            toast.success("Employee Information Deleted");
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error);
    }
}

export const GetEmployee = async() => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_EMPLOYEE_MANAGEMENT_API}/get-all-employees`);
        if(response && response.data.length > 0){
            return response.data;
        }else{
            toast.info("No Employee Added Yet!")

        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error)
    }
    return null;
}

export const GetSingleEmployee = async(id) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_EMPLOYEE_MANAGEMENT_API}/get-employee-detail/${id}`)
        if(response){
            return response.data;
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error)
    }

}