import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling 
import './buttons.css';

const LoginButton = () => {

    const navigate = useNavigate();
    const navigateLogin = () => {navigate('/login');};

    return(<div> <button className="login" onClick={navigateLogin}> LOGIN </button> </div>)
}

export default LoginButton;