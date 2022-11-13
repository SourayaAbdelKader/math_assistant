import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './headers.css';
import logo from '../../images/logo.png';
import LoginButton from "../Buttons/LoginButton";

const LoginHeader = () => {
    
    const navigate = useNavigate();
    const navigateHome = () => {navigate('/');};

    return(
        <div className="headercontainer">
            <div className="flex">
                <div> <img className="pointer" onClick={navigateHome} src={logo} alt="logo" /> </div>
                <div> <h3  onClick={navigateHome} className="white_text pointer"> Math Assistant </h3> </div>
            </div>
            <div> 
                <LoginButton></LoginButton>
            </div>
            
        </div>
        
    )
}

export default LoginHeader;
