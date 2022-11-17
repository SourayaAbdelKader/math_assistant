import React from 'react';
import { useState, useEffect } from 'react';

// Importing styling and assets
import './widgets.css';
import accept from '../images/accept.png';
import accepted_image from '../images/accepted.png';
import picture from '../images/profileSelected.png';
import vote_up from '../images/vote_up.png';
import vote_down from '../images/vote_down.png';

// Importing popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing API
import QuestionAPI from '../hooks/questionsAPI';
import AnswerAPI from '../hooks/answersApi';


const AnswerWidget = (answer) => {

    const componentRef = React.useRef();

    const [description, setDescription] = useState("");
  
    const handleClick = (e) => {
        localStorage.setItem('choosed_answer', answer.id);
    }

    const handleAcceptance = () => {
        if (answer.accepted == 1){
            return accepted_image;
        } else { return accept;
        }
    }

    const image_source = handleAcceptance();
    

    return(
        <div onClick={handleClick} id={answer.id} className="answer_container">
            <div className="flex_between space">
                <div className="flex">
                    <div> <img className='profile_pic' src={picture} alt=''/> </div>
                    <div> <p className='name'> </p> </div>
                </div>
                <div>
                    <div> <img className="medium_icon cursor" src={image_source} alt="accept" /> </div>
                </div>
            </div>
            <div className='question_content pointer'>
                <div className='part space'> 
                    <p className='text'>{answer.description} </p>
                </div>
            </div>
            <div className="flex_end">
                <div> <img className="medium_icon cursor" src={vote_down} alt="save" /> </div>
                <div> <img className="medium_icon cursor space_left" src={vote_up} alt="save" /> </div>
            </div>
        </div>        
    )
}

export default AnswerWidget;