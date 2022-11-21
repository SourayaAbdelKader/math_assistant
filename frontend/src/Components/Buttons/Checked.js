import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './buttons.css';
import checked from '../../images/checked.png';

const Checked = () => {

    const navigate = useNavigate();
    const navigateFeecback = () => {navigate('/practice/feedback');};

    return(<div> <button className="solve" onClick={navigateFeecback}> <img className="small_icon" src={checked} alt='search'/> CHECKED </button> </div>)
}

export default Checked;