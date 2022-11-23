import React from 'react';
import { useState, useEffect } from 'react';

// Importing styling and assets
import './widget.css';
import delete_icon from '../images/delete.png';
import accept from '../images/accept.png';
import accepted_image from '../images/accepted.png';
import picture from '../images/profileSelected.png';

// Importing popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing API
import QuestionAPI from '../hooks/QuestionAPI';
import AnswerAPI from '../hooks/AnswerAPI';


const AnswerWidget = (answer) => {

    const componentRef = React.useRef();
    const [openAccept, setOpenAccept] = useState(false);
    const [message, setMessage] = useState('');
  
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
                    <div> <p className='name'> {answer.name} </p> </div>
                </div>
                <div>
                <div>
                    <img className="medium_icon cursor" src={image_source} alt="accept" />
                    <Popup open={openAccept} modal nested >
                        {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                            &times;
                            </button>
                            <div> <h3>{message}</h3></div>
                        </div>
                        )}
                    </Popup>
                </div>
                </div>
            </div>
            <div className='question_content pointer'>
                <div className='part space'> 
                    <p className='text'> {answer.description} </p>
                </div>
            </div>
        </div>        
    )
}

export default AnswerWidget;