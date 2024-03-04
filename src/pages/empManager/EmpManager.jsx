import React, { useEffect, useState } from 'react'
import "../../style/EmpManager.scss"
import { useNavigate } from 'react-router-dom'
import { DeleteEmployee, GetEmployee } from '../../components/crud/employee-CRUD'
import { toast } from 'react-toastify'


const EmpManager = () => {

    const [data, setData] = useState([]);
    const [fieldSort, setFieldSort] = useState("");
    const [levelSort, setLevelSort] = useState("");
    const [salarySort, setSalarySort] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(6);


    const navigate = useNavigate();

    const toggleNavigate = (id) => {
        navigate(`/homepage/edit-employee-details/${id}`)
    }

    const toggleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
        if (isConfirmed) {
            try {
                DeleteEmployee(id);
                const result = await GetEmployee();
                setData(result);
                window.location.reload();
            } catch (error) {
                toast.error("An error occurred, Please try again later. " + error);
            }
        }
    }

    const toggleHandleAllSort = ()=>{
        setFieldSort("");
        setLevelSort("");
        setSalarySort("");
    }

    const toggleNavigateEmployeeDetails = (diraction)=>{
        navigate(`/homepage/${diraction}`)
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetEmployee();
                setData(result);
            } catch (error) {
                toast.error("An error occurred, Please try again later. " + error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if(data?.length > 0){
            let filtered = [...data];
            if (fieldSort) filtered = filtered.filter(employee => employee.field[0].field === fieldSort);
            if (levelSort) filtered = filtered.filter(employee => employee.level[0].level === levelSort);
            if (salarySort === "lower-to-higher") filtered.sort((a, b) => a.salary - b.salary);
            if (salarySort === "higher-to-lower") filtered.sort((a, b) => b.salary - a.salary);
            setFilteredData(filtered);
        }
    }, [data, fieldSort, levelSort, salarySort]);

        const indexOfLastEmployee = currentPage * perPage;
        const indexOfFirstEmployee = indexOfLastEmployee - perPage;
        const currentEmployees = filteredData.slice(indexOfFirstEmployee, indexOfLastEmployee);
        const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='employee'>
            <div className="title">
                <h1>Employee List</h1>
            </div>
            <div className="sorts">
                <div className='buttons'>
                    <button style={{ background: "green", cursor: "pointer" }} onClick={()=>navigate("/homepage/add-employee-details")}>Add New Employee</button>
                    <button style={{ background: "blue", cursor: "pointer" }} onClick={toggleHandleAllSort}>All</button>

                    <button style={{ background: "lightgreen", cursor: "pointer" }} onClick={()=> setLevelSort("Junior")}>Junior</button>
                    <button style={{ background: "orange", cursor: "pointer" }} onClick={()=> setLevelSort("Mid-Junior")}>Mid-Junior</button>
                    <button style={{ background: "red", cursor: "pointer" }} onClick={()=> setLevelSort("Senior")}>Senior</button>

                    <button style={{ background: "purple", cursor: "pointer" }} onClick={()=> setFieldSort("Frontend")}>Frontend</button>
                    <button style={{ background: "pink", cursor: "pointer" }} onClick={()=> setFieldSort("Backend")}>Backend</button>
                    <button style={{ background: "olive", cursor: "pointer" }} onClick={()=> setFieldSort("Full-Stack")}>Full-Stack</button>
                    <button style={{ background: "brown", cursor: "pointer" }} onClick={()=> setFieldSort("DevOps")}>DevOps</button>
                    <button style={{ background: "cyan", cursor: "pointer" }} onClick={()=> setFieldSort("Data Analysis")}>Data Analysis</button>
                    <button style={{ background: "violet", cursor: "pointer" }} onClick={()=> setFieldSort("Cyber-Security")}>Cyber-Security</button>
                    <button style={{ background: "teal", cursor: "pointer" }} onClick={()=> setFieldSort("Leader")}>Leader</button>

                    <button style={{ background: "magenta", cursor: "pointer" }} onClick={()=> setSalarySort("lower-to-higher")}>Salary Higher to Lower</button>
                    <button style={{ background: "gray", cursor: "pointer" }} onClick={()=> setSalarySort("higher-to-lower")}>Salary Lower to Higher</button>
                </div>
            </div>
            <div className="list">
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Salary per Month</th>
                            <th>Level</th>
                            <th>Field</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.length > 0 &&
                            currentEmployees.map((employee, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{employee.name.length > 0 ? employee.name : "Null"} {employee.surname.length > 0 ? employee.surname : "Null"}</td>
                                        <td>{employee.email.length > 0 ? employee.email : "Null"}</td>
                                        <td>{employee.salary > 0 ? employee.salary : "Null"}</td>
                                        <td>{employee.level.length > 0 ? employee.level[0].level : "Null"}</td>
                                        <td>{employee.field.length > 0 ? employee.field[0].field : "Null"}</td>
                                        <td>
                                            <button style={{ background: "#3498db", color: "#ffffff" }} onClick={() => toggleNavigate(employee.id)}>Edit</button>
                                            <button style={{ background: "#e74c3c", color: "#ffffff" }} onClick={() => toggleDelete(employee.id)}>Delete</button>
                                            <button style={{ background: "green", color:"white", cursor: "pointer" }} onClick={()=> navigate(`/homepage/employee-details/${employee.id}`)}>View</button>
                                            <br />
                                            <button style={{ background: "blue", color:"white", cursor: "pointer" }} onClick={()=> toggleNavigateEmployeeDetails(`get-employee-tasks/${employee.email}`)}>Check Tasks</button>
                                            <button style={{ background: "cyan", color:"white", cursor: "pointer" }} onClick={()=> toggleNavigateEmployeeDetails(`achievement/${employee.email}`)}>Achievement</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <ul className="pagination">
                    {Array(Math.ceil(filteredData.length / perPage))
                        .fill()
                        .map((_, i) => (
                            <li key={i} className="page-item">
                                <button onClick={() => paginate(i + 1)} className="page-link">
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}

export default EmpManager