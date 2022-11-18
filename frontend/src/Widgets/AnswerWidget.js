import React from 'react';
import { useState, useEffect } from 'react';

// Importing styling and assets
import './widgets.css';
import accept from '../images/accept.png';
import accepted_image from '../images/accepted.png';
import picture from '../images/profileSelected.png';
import vote_up from '../images/vote_up.png';
import vote_down from '../images/vote_down.png';
import voted_up from '../images/voted_up.png';
import voted_down from '../images/vote_down.png';

// Importing popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing API
import QuestionAPI from '../hooks/questionsAPI';
import AnswerAPI from '../hooks/answersApi';


const AnswerWidget = (answer) => {

    const componentRef = React.useRef();
    const [openAccept, setOpenAccept] = useState(false);
    const [voteUp, setVoteUp] = useState("");
    const [voteDown, setVoteDown] = useState("");
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

    const handleAccept = (e) => {
        e.preventDefault();
        if (answer.accepted == 0){
            acceptAnAnswer(localStorage.getItem('user_id'), answer.id)
            if (acceptAnAnswer(localStorage.getItem('user_id'), answer.id) == 'Added Successfully'){
                e.target.src = accepted_image;
            }
            setOpenAccept(true);  
        }
        //setMessage('') 
    }

    const acceptAnAnswer = async (user_id, answer_id) => {
        const accept_answer = await AnswerAPI.acceptAnswer({
            "user_id":user_id,
            "answer_id":answer_id,
        });
        console.log(accept_answer.data.message);
        setMessage(accept_answer.data.message);
        return  accept_answer.data.message;   
    }

    const image_source = handleAcceptance();

    const handleVote = (e) =>{
        e.preventDefault();
        voteUpAnAnswer(localStorage.getItem('user_id'), answer.id);
        if (message === 'Added Successfully'){
            e.target.src = voted_up
        }
    }

    const voteUpAnAnswer = async (user_id, answer_id) => {
        const accept_answer = await AnswerAPI.voteUpAnswer({
            "user_id":user_id,
            "answer_id":answer_id,
            "vote":1
        });
        console.log(accept_answer.data.message)
        setVoteUp(accept_answer.data.message);  
        return accept_answer.data.message  
    }

    const handleVoteDown = (e) => {
        e.preventDefault();
        voteDownAnAnswer(localStorage.getItem('user_id'), answer.id);
        if (message == 'Added Successfully'){
            e.target.src = voted_down
        }
    }

    const voteDownAnAnswer = async (user_id, answer_id) => {
        const accept_answer = await AnswerAPI.voteDownAnswer({
            "user_id":user_id,
            "answer_id":answer_id,
            "vote":0
        });
        console.log(accept_answer.data.message)
        setVoteDown(accept_answer.data.message);    
    }
    
    return(
        <div onClick={handleClick} id={answer.id} className="answer_container">
            <div className="flex_between space">
                <div className="flex">
                    <div> <img className='profile_pic' src={picture} alt=''/> </div>
                    <div> <p className='name'> {answer.name} </p> </div>
                </div>
                <div>
                <div>
                    <img onClick={handleAccept} className="medium_icon cursor" src={image_source} alt="accept" />
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
            <div className="flex_end">
                <div> <img onClick={handleVoteDown}  className="medium_icon cursor" src={vote_down} alt="save" /> </div>
                <div> <img onClick={handleVote} className="medium_icon cursor space_left" src={vote_up} alt="save" /> </div>
            </div>
        </div>        
    )
}

export default AnswerWidget;