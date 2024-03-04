import React, { useEffect, useState } from 'react'
import ErrorPage from '../pages/errorPage/ErrorPage';
import {jwtDecode} from 'jwt-decode';
import { useCookies } from 'react-cookie';

const LoggedPermission = ({children}) => {

    const [isValid, setIsValid] = useState(false);
    const [cookies,setCookies,removeCookies] = useCookies(["access_token"]);

    useEffect(()=>{
        const token = cookies["access_token"];
        if(token){
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 7000;
            if(decodedToken.exp > currentTime){
                setIsValid(true);
            }else{
                setIsValid(false);
                removeCookies("access_token");
            }
        }else{
            setIsValid(false);
        }
    },[cookies,removeCookies])
    if(isValid){
        return children;
    }else{
        return <ErrorPage/>
    }
}

export default LoggedPermission