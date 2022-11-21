import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing style
import './cards.css';
import solve from '../../images/submit.png';

const ProblemCard = (props) => { 
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.setItem("selected_practice", props.id);
    navigate('/practice/exercice');}
    
    return(
        <div id={props.id} className="problem_card flex"> 
            <div> 
                <div> <h4 className="question_title"> Question {props.id} </h4> </div>
                <div> <p className="question_name"> {props.name} </p> </div>
            </div>
            <div> <button className="solve" onClick={handleClick}> <img className="small_icon" src={solve} alt='search'/> SOLVE </button> </div>
        </div>
    )
}

export default ProblemCard;