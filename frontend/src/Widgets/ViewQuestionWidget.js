import React from 'react';
import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './widgets.css';
import answer from '../images//answer.png';
import save from '../images/save.png';
import saved from '../images/saved.png';
import picture from '../images/profileSelected.png';
import messageSent from '../images/sent.png';


// Importing libraries related to Latex
import 'katex/dist/katex.min.css';
import Latex from 'react-latex';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing API
import QuestionAPI from '../hooks/questionsAPI';
import AnswerAPI from '../hooks/answersApi';


const ViewQuestionWidget = (question) => {
    
    const componentRef = React.useRef();

    const navigate = useNavigate();
    const navigateQuestion= () => {navigate('/question');};

    // Handeling the navigation to the suitable profile page
    const profile = () => {
        if (question.user_id == localStorage.getItem('user_id')){
            navigate('/profile');
        } else {
            localStorage.setItem('choosed_user', question.user_id);
            navigate('/user/profile');
        }
    }
    
    const handleClick = (e) => {
        localStorage.setItem('choosed_question', question.id);
    }

    const [description, setDescription] = useState("");
    const [savedQuestions, setSavedQuestions] = useState([]);
    const [open, setOpen] = useState(false);
    
    // Getting saved questions (to set the appropriate icon)
    useEffect(() =>{
        const getSavedQuestions  = async () =>{
            const questions = await QuestionAPI.savedQuestions(localStorage.getItem('user_id'));
            if (questions.data.message === 'Found Successfully'){
                const get = questions.data.data;
                setSavedQuestions(get);
            }
    }; getSavedQuestions();}, [])

    const handleSaved = () => {
        if (savedQuestions.length > 0){
            for (let i = 0; i < savedQuestions.length; i++){
                if (question.id === savedQuestions[i].question_id){
                    return saved
                }
            } 
        } return save
    }
    const icon = handleSaved()

    // Handeling profile picture
    const handlePicture = () => {
        if (question.picture_url == null){
            return picture;
        } 
        return question.picture_url;
    }

    const profile_picture = handlePicture()
    
    // Handelong the save and unsave functions
    const saveQuestion = (e) => {
        e.preventDefault();
        if (e.target.src === save) {
            saveQuestionApi(localStorage.getItem("user_id"), question.id);
            e.target.src = saved;
        } else { e.target.src = save;
            unsaveQuestionApi(localStorage.getItem("user_id"), question.id);
        }
    }

    const saveQuestionApi = async (user_id, question_id) => {
        const save_question = await QuestionAPI.saveQuestion({
            "user_id":user_id,
            "question_id":question_id,
        });
    }

    const unsaveQuestionApi = async (user_id, question_id) => {
        const remove_save_question = await QuestionAPI.unsaveQuestion({
            "user_id":user_id,
            "question_id":question_id,
        });
    }

    // Adding an answer to the question
    function handleChange(event){
        let description = event.target.value;
        if(description.length < 30){ 
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        } else { 
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');         
        }
        if (description.length == 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        setDescription(description);
    };

    const addAnswer = async (user_id, questionid, description) => {
        const add_answer = await AnswerAPI.addAnswer({
            "description":description,
            "user_id":user_id,
            "question_id":questionid,
        }) 
        if (add_answer){setOpen(true);}
    }

    const submitAnswer = (e) => {
        e.preventDefault();
        if (description.length > 30){
            e.target.disabled = false;
            addAnswer(localStorage.getItem('user_id'), question.id, description);      
        }
        setDescription("")
    }

    return(
        <div onClick={handleClick} id={question.id} className="view_question_container">
            <div className="flex_between space">
                <div className="flex">
                    <div> <img className='profile_pic' src={profile_picture} alt=''/> </div>
                    <div> <p onClick={profile} className='name pointer'> {question.name}</p> </div>
                </div>
                <div>
                    <div className='tag_name'> {question.title} </div>
                </div>
            </div>
            <div onClick={navigateQuestion} className='question_content pointer'>
                <div className='part space'> 
                    <p className='subtitle'> Problem </p>
                    <p className='text'>
                     <Latex>{question.problem}</Latex> 
                     </p>
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
            <div className="flex_end">
                <div> <img className="s_icon cursor" onClick={saveQuestion} src={icon} alt="save" /> </div>
                <div> 
                    <Popup trigger={<img className="s_icon cursor" src={answer} alt="answer" />} modal nested >
                        {close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                &times;
                                </button>
                                <div className="header center space"> <h3> Enter Your Answer </h3> </div>
                                <div className='space'> <textarea onChange={handleChange} className='popup_textarea' placeholder='Type your answer here...'></textarea> </div>
                                { open && (<div className='message_sent'> <img className='medium_icon' src={messageSent} alt='sent'/> Answer Sent Successfully </div>)}
                                <div> <p ref={node => componentRef.current = node} className="error_text hide space"> Input can't be empty and must be more than 30 character </p> </div>
                                <div className="actions flex_inbetween">
                                    <button disabled={description.length < 30} className="login" onClick={(e) => {submitAnswer(e); setTimeout(() => close(), 2000);}}> Submit </button>  
                                    <button className="login" onClick={() => {close();}}> Cancel </button>
                                </div>
                            </div>
                            )}
                    </Popup>
                </div>
            </div>
        </div>        
    )
}

export default ViewQuestionWidget;