import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

import './sidebars.css';
import ask from '../../images/ask.png';

const QuestionsSidebar = () => {

    const navigate = useNavigate();
    const navigateAskQuestion = () => {navigate('/askQuestion');};

    return(
        <div className="questions_side_container">
            <div> <h4> Questions </h4> </div>
            <div> <button onClick={navigateAskQuestion} className="ask"> <img className="s_icon" src={ask} alt="ask" /> ASK </button> </div>   
        </div>        
    )
}

export default QuestionsSidebar;