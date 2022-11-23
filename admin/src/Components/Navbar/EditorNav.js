import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

import dashboard from '../../images/dash.png';
import user from '../../images/dash_users.png';
import tags from '../../images/dash_tags.png';
import editors from '../../images/dash_editors_selected.png';
import practice from '../../images/dash_practice.png';
import questions from '../../images/dash_questions.png';
import profile from '../../images/profile_dash.png'

import Signout from "../Buttons/Signout";

import './nav.css';

const EditorNav = () => {
    
    const navigate = useNavigate();
    const navigateProfile = () => {navigate('/profile');};
    const navigateDashboard = () => {navigate('/dashboard');};
    const navigateUsers = () => {navigate('/users');};
    const navigateEditors = () => {navigate('/editors')};
    const navigateQuestions = () => {navigate('/questions')};
    const navigatePractice = () => {navigate('/practice')};
    const navigateTags = () => {navigate('/tags')};

    return(
        <div className="nav_container">
            <div onClick={navigateDashboard} className="flex part cursor">
                <div> <img className="icon" src={dashboard} alt="" /> </div>
                <div className="bold"> Dashboard </div>
            </div>
            <div onClick={navigateUsers} className="flex part cursor">
                <div> <img className="icon" src={user} alt="" /> </div>
                <div className="bold"> Users </div>
            </div>
            <div onClick={navigateEditors} className="flex choosen part cursor">
                <div> <img className="icon" src={editors} alt="" /> </div>
                <div className="bold white_text"> Editors </div>
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
            <div onClick={navigateProfile} className="flex part cursor">
                <div> <img className="icon" src={profile} alt="" /> </div>
                <div className="bold"> Profile </div>
            </div>
            <div className="">
                <Signout></Signout> 
            </div>         
        </div>      
    )
}

export default EditorNav;