import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

import dashboard from '../../images/dash_selected.png';
import user from '../../images/dash_users.png';
import tags from '../../images/dash_tags.png';
import editors from '../../images/dash_editors.png';
import practice from '../../images/dash_practice.png';
import questions from '../../images/dash_questions.png';
import Signout from "../Buttons/Signout";

import './nav.css';

const Navbar = () => {
    
    const navigate = useNavigate();
    const navigateDashboard = () => {navigate('/dashboard');};
    const navigateUsers = () => {navigate('/users');};
    const navigateEditors = () => {navigate('/editors')};
    const navigateQuestions = () => {navigate('/questions')};
    const navigatePractice = () => {navigate('/practice')};
    const navigateTags = () => {navigate('/tags')};

    return(
        <div className="nav_container">
            <div onClick={navigateDashboard} className="flex part choosen cursor">
                <div> <img className="icon" src={dashboard} alt="" /> </div>
                <div className="bold white_text"> Dashboard </div>
            </div>
            <div onClick={navigateUsers} className="flex part cursor">
                <div> <img className="icon" src={user} alt="" /> </div>
                <div className="bold"> Users </div>
            </div>
            <div onClick={navigateEditors} className="flex part cursor">
                <div> <img className="icon" src={editors} alt="" /> </div>
                <div className="bold"> Editors </div>
            </div>
            <div onClick={navigateQuestions} className="flex part cursor">
                <div> <img className="icon" src={questions} alt="" /> </div>
                <div className="bold"> Questions </div>
            </div>
            <div onClick={navigatePractice} className="flex part cursor">
                <div> <img className="icon" src={practice} alt="" /> </div>
                <div className="bold"> Practice </div>
            </div>
            <div onClick={navigateTags} className="flex part cursor">
                <div> <img className="icon" src={tags} alt="" /> </div>
                <div className="bold"> Tags </div>
            </div>
            <div className="button_container">
                <Signout></Signout> 
            </div>         
        </div>      
    )
}

export default Navbar;