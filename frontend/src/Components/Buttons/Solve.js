import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './buttons.css';
import solve from '../../images/submit.png';

const Solve = (props) => {

    const navigate = useNavigate();
    const navigateExercice = () => {navigate('/practice/exercice');};

    return(<div> <button className="solve" onClick={navigateExercice}> <img className="small_icon" src={solve} alt='search'/> SOLVE </button> </div>)
}

export default Solve;