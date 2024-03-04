import { Route, Routes } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import "../../style/Homepage.scss"
import Dashboard from "../dashboard/Dashboard"
import EmpManager from "../empManager/EmpManager"
import Field from "../field/Field"
import AddEmployee from "../crud-pages/employee/AddEmployee"
import EditEmployee from "../crud-pages/employee/EditEmployee"
import AddField from "../crud-pages/field/AddField"
import EditField from "../crud-pages/field/EditField"
import EmployeeDetails from "../employeeDetails/EmployeeDetails"
import AddTask from "../crud-pages/task/AddTask"
import TasksPage from "../employeeTasks/TasksPage"
import EditTask from "../crud-pages/task/EditTask"
import Achievement from "../achievement/Achievement"
import Calendar from "../calendar/Calendar"
import TaskDetails from "../task-details/TaskDetails"

const Homepage = () => {
  return (
    <div className="homepage">
        <div className="left">
            <Sidebar/>
        </div>
        <div className="right">
            <Navbar/>
            <Routes>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/manage-employee" element={<EmpManager/>}/>
                <Route path="/field" element={<Field/>}/>
                <Route path="/add-employee-details" element={<AddEmployee/>}/>
                <Route path="/edit-employee-details/:id" element={<EditEmployee/>}/>
                <Route path="/add-field" element={<AddField/>}/>
                <Route path="/edit-field/:id" element={<EditField/>}/>
                <Route path="/employee-details/:id" element={<EmployeeDetails/>}/>
                <Route path="/get-employee-tasks/:email" element={<TasksPage/>}/>
                <Route path="/add-task/:email" element={<AddTask/>}/>
                <Route path="/edit-task/:id/:email" element={<EditTask/>}/>
                <Route path="/achievement/:email" element={<Achievement/>}/>
                <Route path="/employee-calendar/:email" element={<Calendar/>}/>
                <Route path="/task-details/:id/:email" element={<TaskDetails/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default Homepage