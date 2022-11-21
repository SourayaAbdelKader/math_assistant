import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './headers.css';
import logo from '../../images/logo.png';
import notification from '../../images/notification.png';
import profile from '../../images/profileSelected.png';

const ProfileHeader = () => {

    const navigate = useNavigate();
    const navigateProfile = () => {navigate('/profile');};

    return(
        <div className="headercontainer">
            <div className="flex">
                <div> <img className="pointer pointer" src={logo} alt="logo" /> </div>
                <div> <h1 className="white_text pointer" > Math Assistant </h1> </div>
            </div>
            <div className="flex"> 
                <div> <img className="icon cursor" src={notification} alt="notification"/> </div>
                <div> <img className="icon cursor" onClick={navigateProfile} src={profile} alt="profile"/> </div>
            </div>
        </div>    
    )
}

export default ProfileHeader;