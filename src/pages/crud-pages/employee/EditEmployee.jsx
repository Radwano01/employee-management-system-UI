import { useEffect, useState } from "react";
import "../../../style/EditEmployee.scss"
import { ModifyEmployee, GetSingleEmployee } from "../../../components/crud/employee-CRUD";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GetField } from "../../../components/crud/fields-CRUD";

const EditEmployee = () => {
    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        salary: 0,
        field: "",
        level: "",
        password: "",
    });
    const [fields, setFields] = useState([]);
    const { id } = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            ModifyEmployee(id, data);
        } catch (error) {
            toast.error("An error occurred, Please try again later. " + error);
        }
    }
    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await GetSingleEmployee(id);
                setData({
                    name: result.name.length > 0 ? result.name : "Null",
                    surname: result.surname.length > 0 ? result.surname : "Null",
                    email: result.email.length > 0 ? result.email : "Null",
                    salary: result.salary > 0 ? result.salary : 0,
                    field: result.fields[0].field.length > 0 ? result.fields[0].field : "Null",
                    level: result.levels[0].level.length > 0 ? result.levels[0].level : "Null",
                });

            } catch (error) {
                toast.error("An error occurred, Please try again later. " + error);
            }
        }

        fetchData();
    }, [id])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const Result = await GetField();
                if (Result) {
                    setFields(Result);
                }
            } catch (error) {
                toast.error("An error occurred, Please try again later. " + error);
            }
        }

        fetchData();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    return (
        <div className='edit'>
            <div className="title">
                <h1>Edit Employee Details</h1>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <div className="column">
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" required value={data.name} placeholder="Employee Name" onChange={handleChange} />
                        </div>

                        <div className="column">
                            <label htmlFor="surname">SurName:</label>
                            <input type="text" name="surname" required value={data.surname} placeholder="Employee SurName" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="input">
                        <div className="column">
                            <label htmlFor="email">Email:</label>
                            <input type="text" name="email" required value={data.email} placeholder="Employee Email" onChange={handleChange} />
                        </div>
                        <div className="column">
                            <label htmlFor="salary">Salary Per Month:</label>
                            <input type="text" name="salary" required value={data.salary} placeholder="Salary Per Month" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="input">
                        <div className="column">
                            <label htmlFor="level">Level:</label>
                            <select name="level" required value={data.level} onChange={handleChange}>
                                <option value="" disabled>Select a level</option>
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
                                    fields.map((field) => {
                                        return (
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
                            <input type="text" name="password" required placeholder="Employee Password" onChange={handleChange} />
                        </div>
                        <div className="column">


                            <div className="submit-column">
                                <button type="submit" style={{ backgroundColor: "#007bff" }}>Edit Employee</button>
                            </div></div>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default EditEmployee