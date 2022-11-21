import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './buttons.css';
import viewSolved from '../../images/view_checked.png';

const ViewSolve = () => {

    const navigate = useNavigate();
    const navigateSolved = () => {navigate('/practice/solved');};

    return(<div> <button className="solve" onClick={navigateSolved}> <img className="small_icon" src={viewSolved} alt='search'/> VIEW SOLVED </button> </div>)
}

export default ViewSolve;