import { useEffect, useState } from "react"
import "../../../style/AddEmployee.scss"
import { CreateEmployee } from "../../../components/crud/employee-CRUD";
import { GetField } from "../../../components/crud/fields-CRUD";
import { toast } from "react-toastify";

const AddEmployee = () => {
    const [data,setData] = useState({
        name:"",
        surname:"",
        email:"",
        salary:0,
        field:"",
        level:"",
        password:"",
    });
    const [fields, setFields] = useState([]);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        try{
            CreateEmployee(data);
        }catch(error){
            toast.error("An error occurred, Please try again later. "+error);
        }
    }
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setData({...data, [name]:value})
    }   

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const Result = await GetField();
                if(Result){
                    setFields(Result);
                }
            }catch(error){
                toast.error("An error occurred, Please try again later. "+error);
            }
        }

        fetchData();
    },[])
    return (
        <div className='add'>
            <div className="title">
                <h1>Add New Employee</h1>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <div className="column">
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" required placeholder="Employee Name" onChange={handleChange}/>
                        </div>

                        <div className="column">
                            <label htmlFor="surname">SurName:</label>
                            <input type="text" name="surname" required placeholder="Employee SurName" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="input">
                        <div className="column">
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" required placeholder="Employee Email" onChange={handleChange}/>
                        </div>
                        <div className="column">
                            <label htmlFor="salary">Salary Per Month:</label>
                            <input type="number" name="salary" required placeholder="Salary Per Month" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="input">
                        <div className="column">
                            <label htmlFor="level">Level:</label>
                            <select name="level" required onChange={handleChange} defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select a level</option>
                                <option value="Junior">Junior</option>
                                <option value="Mid-Junior">Mid-Junior</option>
                                <option value="Senior">Senior</option>
                            </select>
                        </div>

                        <div className="column">
                            <label htmlFor="field">Field:</label>
                            <select name="field" required onChange={handleChange} defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select a Field</option>
                                {fields.length > 0 ? (
                                    fields.map((field)=>{
                                        return(
                                            <option key={field.id} value={field.field}>{field.field}</option>
                                        )
                                    })
                                ) : ("Error")}
                            </select>
                        </div>
                    </div>
                    <div className="input">
                        <div className="column">
                            <label htmlFor="password">Password:</label>
                            <input type="text" name="password" required placeholder="Employee Password" onChange={handleChange}/>
                        </div>
                        <div className="column">
                            <div className="submit-column">
                               <button type="submit" style={{backgroundColor:"#007bff"}}>Add New Employee</button> 
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee