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
import voted_down from '../images/voted_down.png';

// Importing popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
// Importing API
import AnswerAPI from '../hooks/answersApi';


const AnswerWidget = (answer) => {
    const navigate = useNavigate();
    const profile = () => {
        console.log(answer.user_id)
        if (answer.user_id == localStorage.getItem('user_id')){
            navigate('/profile');
        } else {
            localStorage.setItem('choosed_user', answer.user_id);
            navigate('/user/profile');
        }
    }

    const componentRef = React.useRef();

    // Handeling profile picture
    const handlePicture = () => {
        if (answer.picture_url == null){
            return picture;
        } 
        return answer.picture_url;
    }

    const profile_picture = handlePicture()

    const [openVoteUp, setOpenVoteUp] = useState(false);
    const [openVoteDown, setOpenVoteDown] = useState(false);
    const [openAccept, setOpenAccept] = useState(false);
    const [voteUp, setVoteUp] = useState("");
    const [voteDown, setVoteDown] = useState("");
    const [message, setMessage] = useState('');
  
    const handleClick = (e) => {
        localStorage.setItem('choosed_answer', answer.id);
    }

    // Handeling the acceptance of the answer
    const handleAcceptance = () => {
        if (answer.accepted == 1){
            return accepted_image;
        } else { return accept;
        }
    }

    const image_source = handleAcceptance();

    const handleAccept = (e) => {
        e.preventDefault();
        if (answer.accepted == 0){
            acceptAnAnswer(localStorage.getItem('user_id'), answer.id)
            if (message == 'Accepted'){
                e.target.src = accepted_image;
            }
            setOpenAccept(true);  
        }
        setMessage('') 
    }

    const acceptAnAnswer = async (user_id, answer_id) => {
        const accept_answer = await AnswerAPI.acceptAnswer({
            "user_id":user_id,
            "answer_id":answer_id,
        });
        if (accept_answer.data.message == 'Added Successfully' || accept_answer.data.message == 'Answer Already Accepted'){
            setMessage('Accepted');
        } else {setMessage("You can't accept this answer")}
           
    }

    // Handeling the voting
    const handleVote = async(e) =>{
        e.preventDefault();
        const accept_answer = await AnswerAPI.voteUpAnswer({
            "user_id":localStorage.getItem('user_id'),
            "answer_id":answer.id,
            "vote":1
        });
        setVoteUp(accept_answer.data.message);  
        if (accept_answer.data.message === 'Added Successfully'){
            e.target.src = voted_up;
            setOpenVoteUp(true);
            setVoteUp('Voted Successfully');
        } else if (accept_answer.data.message ==='User Already Voted') {
            setOpenVoteUp(true);
            setVoteUp('You Already Voted');
        } else if (accept_answer.data.message ==='User Exceeded Votes Per Day'){
            setOpenVoteUp(true);
            setVoteUp('You can not vote more than 20 times per day.');
        } else {
            setOpenVoteUp(true);
            setVoteUp('You Can Not Voted');
        }
    }

    const handleVoteDown = async (e) => {
        e.preventDefault();
        const accept_answer = await AnswerAPI.voteDownAnswer({
            "user_id":localStorage.getItem('user_id'),
            "answer_id":answer.id,
            "vote":0
        });
        if (accept_answer.data.message === 'Added Successfully'){
            e.target.src = voted_down;
            setOpenVoteDown(true);
            setVoteDown('Voted Successfully');
        } else if (accept_answer.data.message ==='User Already Voted') {
            setOpenVoteDown(true);
            setVoteDown('You Already Voted');
        } else if (accept_answer.data.message ==='User Exceeded Votes Per Day'){
            setOpenVoteDown(true);
            setVoteDown('You can not vote more than 20 times per day.');
        } else {
            setOpenVoteDown(true);
            setVoteDown('You Can Not Vote');
        }
    }
    
    return(
        <div onClick={handleClick} id={answer.id} className="answer_container">
            <div className="flex_between space">
                <div className="flex">
                    <div> <img className='profile_pic' src={profile_picture} alt=''/> </div>
                    <div> <p onClick={profile} className='name pointer'> {answer.name} </p> </div>
                </div>
                <div>
                <div>
                    <img onClick={handleAccept} className="medium_icon cursor" src={image_source} alt="accept" />
                    <Popup open={openAccept} modal nested >
                        {close => (
                            <div className="modal flex">
                                <button className="close space_right" onClick={close}>
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
                <div> <img onClick={handleVoteDown}  className="medium_icon cursor" src={vote_up} alt="save" /> </div>
                <Popup open={openVoteUp} modal nested >
                        {close => (
                            <div className="modal flex">
                                <button className="close space_right" onClick={close}>
                                &times;
                                </button>
                                <div> <h3>{voteUp}</h3></div>
                            </div>
                        )}
                </Popup>
                <div> <img onClick={handleVote} className="medium_icon cursor space_left" src={vote_down} alt="save" /> </div>
                <Popup open={openVoteDown} modal nested >
                        {close => (
                            <div className="modal flex">
                                <button className="close space_right" onClick={close}>
                                &times;
                                </button>
                                <div> <h3>{voteDown}</h3></div>
                            </div>
                        )}
                </Popup>
            </div>
        </div>        
    )
}

export default AnswerWidget;