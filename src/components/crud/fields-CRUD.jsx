import axios from "axios";
import { toast } from "react-toastify";


export const CreateField = async(data)=>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_EMPLOYEE_FIELD_API}/add-new-field`,{
            field:data.field,
        })
        if(response){
            toast.success("Field Added Successfully");
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error);
    }
}

export const ModifyField = async(id,data)=>{
    try{
        const response = await axios.put(`${process.env.REACT_APP_EMPLOYEE_FIELD_API}/edit-field/${id}`,{
            field:data.field,
        })
        if(response){
            toast.success("Field Updated Successfully.");
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error);
    }
}

export const DeleteField = async(id)=>{
    try{
        const response = await axios.delete(`${process.env.REACT_APP_EMPLOYEE_FIELD_API}/delete-field/${id}`)
        if(response){
            toast.success("Field Deleted Successfully.");
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error);
    }
}

export const GetField = async()=>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_EMPLOYEE_FIELD_API}/get-fields`)
        if(response && response.data.length > 0){
            return response.data;
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error);
    }
}

export const GetSingleField = async(id)=>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_EMPLOYEE_FIELD_API}/get-single-field/${id}`);
        if(response){
            return response.data;
        }
    }catch(error){
        toast.error("An error occurred, Please try again later. "+error);
    }
}