import React, { useEffect, useState } from 'react'
import "../../style/EmployeeDetails.scss"
import { useParams } from 'react-router-dom'
import { GetSingleEmployee } from '../../components/crud/employee-CRUD';

import { toast } from 'react-toastify';


const EmployeeDetails = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const Result = await GetSingleEmployee(id)
                if (Result) {
                    setData([Result])
                }
            } catch (error) {
                toast.error("Error with Fetching the data. " + error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className='employee-details'>
            <div className="title">
                <h1>Employee Details</h1>
            </div>

            <div className="container">
                <div className="employee-detail">
                    {data?.map((details, index) => {
                        return (
                            <>
                                <div className="calendar-direction">
                                    <a href={`/homepage/employee-calendar/${details.email}`}>Calendar &#8594;</a>
                                </div>
                                <div className="details" key={index}>
                                    <h3>Name: {details.name} </h3>
                                    <h3>Surname: {details.surname}</h3>
                                    <h3>Email: {details.email}</h3>
                                    <h3>Salary: {details.salary}</h3>
                                    <h3>Field: {details.fields[0].field}</h3>
                                    <h3>Level: {details.levels[0].level}</h3>
                                    <h3>Role: {details.roles[0].role}</h3>
                                </div></>
                        )
                    })}
                </div>


            </div>
        </div>
    )
}

export default EmployeeDetails