import React from 'react';
import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './widget.css';
import delete_icon from '../images/delete.png';
import picture from '../images/profileSelected.png';

// Importing libraries related to Latex
import 'katex/dist/katex.min.css';
import Latex from 'react-latex';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing API
import QuestionAPI from '../hooks/QuestionAPI';
import AnswerAPI from '../hooks/AnswerAPI';


const ViewQuestionWidget = (question) => {

    const componentRef = React.useRef();

    const navigate = useNavigate();

    const [description, setDescription] = useState("");

    const navigateQuestion= () => {navigate('/question');};
    
    const handleClick = (e) => {
        localStorage.setItem('choosed_question', question.id);
    }
    
    return(
        <div onClick={handleClick} id={question.id} className="view_question_container">
            <div className="flex_between space">
                <div className="flex">
                    <div> <img className='profile_pic' src={picture} alt=''/> </div>
                    <div> <p className='name'> {question.name}</p> </div>
                </div>
                <div>
                    <div className='tag_name'> {question.title} </div>
                </div>
            </div>
            <div onClick={navigateQuestion} className='question_content pointer'>
                <div className='part space'> 
                    <p className='subtitle'> Problem </p>
                    <p className='text'> <Latex>{question.problem}</Latex> </p>
                </div>
                <div className='part space'> 
                    <p className='subtitle'> Description </p>
                    <p className='text'> {question.description} </p>
                </div>
                <div className='part space'> 
                    <p className='subtitle'> Suggested solution </p>
                    <p className='text'> <Latex>{question.suggested_solution}</Latex></p>
                </div>
            </div>
        </div>        
    )
}

export default ViewQuestionWidget;