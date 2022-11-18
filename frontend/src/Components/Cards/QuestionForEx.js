import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing style and assets
import './cards.css';
import back from '../../images/back.png';

const QuestionForEx = (props) => {    

    const navigate = useNavigate();
    const navigatePractice = () => {navigate('/practice');};

    return(
        <div className='question_section'>
            <div className='flex space'> 
                <img className='medium_icon cursor' onClick={navigatePractice} src={back} alt="back" />
                <h3 className='white_text space_left'> Question {props.id} </h3>
            </div>
            <div className='bold white_text space'> {props.name}</div>
            <div className='white_text space'> 
            {props.description} 
            </div>
            <div className="space"> <img src={props.picture_url} alt="" /> </div>
            <div> 
                <p className='white_text'> Level: {props.level}</p>
                <p className='white_text'> {props.points} points</p> 
            </div>
    </div>
    )
}

export default QuestionForEx;