import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './headers.css';
import logo from '../../images/logo.png';
import notification from '../../images/notification.png';
import profile from '../../images/profile.png';

const Header = () => {
    
    const navigate = useNavigate();
    const navigateProfile = () => {navigate('/profile');};
    const navigateHome = () => {navigate('/');};

    return(
        <div className="headercontainer">
            <div className="flex">
                <div> <img className="pointer" onClick={navigateHome} src={logo} alt="logo" /> </div>
                <div> <h1 className="white_text pointer" onClick={navigateHome}> Math Assistant </h1> </div>
            </div>
            <div className="flex"> 
            </div>
        </div>    
    )
}

export default Header;