import React from 'react';
import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './widgets.css';

import {  onMessageListener, getTokens } from '../firebase';
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import UserAPI from '../hooks/userAPI';

const NotificationItem = (props) => {
    const navigate = useNavigate();

    const navigatePractice = () => {navigate('/practice/feedback');};
    
    const seeFeedback = () => {
        console.log(props.body);
        localStorage.setItem('selected_practice', props.body.split('/')[2]);        
    }

    
    return(
        <div className='notification pointer' id={props.id} onClick={() => {seeFeedback(); navigatePractice()}}> 
            <p className='bold'>{props.title}</p>
            <p> {props.body.split('/')[0]}</p>
        </div>    
    )
}

export default NotificationItem;