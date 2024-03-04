import { NavLink, useNavigate } from "react-router-dom"
import { TfiDashboard } from "react-icons/tfi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import "../style/Sidebar.scss"
import { useCookies } from "react-cookie";

const Sidebar = () => {
    const [cookies,setCookies,removeCookies] = useCookies(["access_token"]);

    const handleLogout = ()=>{
        removeCookies("access_token")
    }
  return (
    <div className="sidebar">
        <div className="side">
            <h1>ADMIN PAGE</h1>
            <div className="links">
                <NavLink to={"/homepage/dashboard"}>
                    <TfiDashboard size={40}/>
                    <h3>Dashboard</h3>
                </NavLink>
                <NavLink to={"/homepage/manage-employee"}>
                    <MdOutlineManageAccounts size={40}/>
                    <h3>Manage Employee</h3>
                </NavLink>
                <NavLink to={"/homepage/field"}>
                    <BiSolidCategory size={40}/>
                    <h3>Fields</h3>
                </NavLink>
                <NavLink to={"/"} onClick={handleLogout}>
                    <IoIosLogOut size={40} />
                    <h3>Logout</h3>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Sidebar