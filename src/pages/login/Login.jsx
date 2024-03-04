import { useState } from "react";
import "../../style/Login.scss"
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const Login = () => {
    const [hashPassword, setHashPassword] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [x,setCookies,removeCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_ADMIN_API}`, {
                username: username,
                password: password,
            })
            if(response && response.data){
                setCookies("access_token", response.data.accessToken);
                navigate("/homepage/dashboard");
            }else{
                toast.error("Email or Password is Wrong!");
                removeCookies("access_token")
            }
        } catch (error) {
            toast.error("An error occurred, Please try again later.");
            removeCookies("access_token")
            console.log(error)
        }
    }

    const togglePasswordVisibility = () => {
        setHashPassword((prev) => !prev);
    }

    return (
        <div className="login">
            <div className="board">
                <div className="title">
                    <h1>Login Page</h1>
                </div>
                <div className="inputs">
                    <form onSubmit={handleSubmit}>
                        <div className="input">
                            <h4>Username:</h4>
                            <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className="input">
                            <h4>Password:</h4>
                            <input type={hashPassword == false ? "text" : "password"} placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                            <div className="checkbox">
                                <input type="checkbox" onClick={togglePasswordVisibility} />
                                <h5>Show Password</h5>
                            </div>
                        </div>
                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;