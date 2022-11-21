import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";

// Importing styling 
import './buttons.css';

const Signout = () => {
    const navigate = useNavigate();
    const navigateHome = () => {
        localStorage.clear();
        secureLocalStorage.setItem('token', '')
        navigate('/');};

    return(<div> <button className="signout" onClick={navigateHome} > SIGN OUT </button> </div>)
}

export default Signout;