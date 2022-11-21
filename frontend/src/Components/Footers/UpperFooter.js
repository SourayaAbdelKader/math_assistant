import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './footers.css';
import logo from '../../images/logo.png';
import SendEmail from "../Buttons/SendEmail";

const UpperFooter = () => {

    const navigate = useNavigate();
    const navigateTags = () => {navigate('/tags');};
    const navigateQuestions = () => {navigate('/questions');};
    const navigatePractice = () => { navigate('/practice');};
    const navigateHome = () => {navigate('/home');};

    return(
        <div className="container">
            <div className="">
                <div className="flex">
                    <div> <img className="pointer" onClick={navigateHome} src={logo} alt="logo" /> </div>
                    <div>
                        <div> <h3 className="pointer" onClick={navigateHome}> Math Assistant </h3> </div>
                        <div> <p className="phrase"> Where math isn't your problem anymore </p> </div>
                    </div> 
                </div>    
            </div>
            <div className="box">
                <div> <p className="cursor" onClick={navigateTags}> Tags </p> </div>
                <div> <p className="cursor" onClick={navigateQuestions}> Questions </p> </div>
                <div> <p className="cursor" onClick={navigatePractice}> Practice </p> </div>
            </div>
            <div className="box">
                <div> <p className="message greeny"> Send a message </p> </div>
                <div> <p className="tiny_text"> Help us to help you </p> </div>
                <SendEmail></SendEmail>
            </div>
        </div>
    )
}

export default UpperFooter;