import React, { use, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const ProtectRoute = ({ children }) => {

    const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        const targetCookie = cookies.find(row => row.startsWith(`${name}=`));
        return targetCookie ? targetCookie.split('=')[1] : null;
    };

    const isAuthenticate = getCookie('token');
    // console.log(isAuthenticate);

    const navgate = useNavigate();


    useEffect(() => {
        if (!isAuthenticate) navgate('/user/login')
    }, [])

    return (
        children
    )
}

export default ProtectRoute