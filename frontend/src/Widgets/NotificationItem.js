import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './widgets.css';

import UserAPI from '../hooks/userAPI';

const NotificationItem = (props) => {
    const navigate = useNavigate();

    const navigatePractice = () => {navigate('/practice/feedback');};
    
    const seeFeedback = async () => {
        localStorage.setItem('selected_practice', props.body.split('/')[2]);
        const update_notification = await UserAPI.updateNotification({
            "id": props.id,
        }); 
    }

    return(
        <div className='notification pointer' id={props.id} onClick={() => {seeFeedback(); navigatePractice()}}> 
            <p className='bold'>{props.title}</p>
            <p> {props.body.split('/')[0]}</p>
        </div>    
    )
}

export default NotificationItem;