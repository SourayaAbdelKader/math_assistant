import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './buttons.css';
import unchecked from '../../images/not_checked.png';

const NotChecked = () => {

    const navigate = useNavigate();
    const navigateFeecback = () => {navigate('/practice/feedback');};

    return(<div> <button className="solve" onClick={navigateFeecback}> <img className="small_icon" src={unchecked} alt='search'/> NOT CHECKED </button> </div>)
}

export default NotChecked;