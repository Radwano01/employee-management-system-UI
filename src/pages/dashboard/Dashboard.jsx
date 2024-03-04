import React, { useEffect, useState } from 'react'
import "../../style/Dashboard.scss"
import Card from '../../components/Card'
import Chart from '../../components/Chart'
import { GetEmployee } from '../../components/crud/employee-CRUD'
import { GetField } from '../../components/crud/fields-CRUD'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [fields, setFields] = useState([]);

    const totalAmount = data.reduce((total, data) => total + data.salary, 0)
    const totalEmployee = data.reduce((total, employee) => {
        let num = 0;
        employee.role.map((role) => {
            if (role.id === 2) {
                num++
            }
        })
        return total + num;
    }, 0);
    const chartData = data.flatMap((data) => {
        return data.level;
    })
    const totalField = fields.length;


    useEffect(() => {
        const fetchData = async () => {
            try{
                const Result = await GetEmployee();
                if (Result) {
                    setData(Result);
                }
            }catch(error){
                toast.error("An error occurred, Please try again later. "+error);
            }
        }

        const fetchField = async () => {
            try{
                const resultField = await GetField();
                if (resultField) {
                    setFields(resultField);
                }
            }catch(error){
                toast.error("An error occurred, Please try again later. "+error);
            }
        }

        fetchData();
        fetchField();
    }, [])
    return (
        <div className='field'>
            <div className="cards">
                <div className="mapped-card">
                    <Card id={data.id} Title={"Fields"} Total={totalField} />
                    <Card id={data.id} Title={"Employee"} Total={totalEmployee} />
                    <Card id={data.id} Title={"SALARY PER MONTH"} Total={`$${totalAmount}`} />
                </div>
            </div>
            <Chart chartData={chartData} />
        </div>
    )
}

export default Dashboard
