import React from 'react';
import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './widgets.css';
import empty_notification from '../images/notification.png';
import full_notifiation from '../images/bell.png';
import NotificationItem from './NotificationItem';

// Importing popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import {  onMessageListener, getTokens } from '../firebase';
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import UserAPI from '../hooks/userAPI';


const NotificationWidget = (answer) => {
    const navigate = useNavigate();
    const [notification, setNotification] = useState({title: '', body: ''});
    const [image, setImage] = useState(empty_notification);
    const [messages, setMessages] = useState([]);
    const [isTokenFound, setTokenFound] = useState(false);
    useEffect(() =>{
        const sendDeviceToken  = async () =>{
            const token = await UserAPI.deviceToken({
            "id":localStorage.getItem("user_id"),
            "device_token":localStorage.getItem("device_token"),
        });}

        
    
        const getNotifications  = async () =>{
            const notification = await UserAPI.getNotificationForUser(localStorage.getItem('user_id'));
            console.log(notification.data.data)
            if (notification.data.message == 'Found' && notification.data.data.length > 0){
                setMessages(notification.data.data);
                setImage(full_notifiation);
                getTokens(setTokenFound)
                onMessageListener().then(payload => {
                        setNotification({title: payload.notification.title, body: payload.notification.body})
                }).catch(err => console.log('failed: ', err));
                const push_notification = await UserAPI.sendNotification({
                    "id": 15,
                    "title": "Math Assistant",
                    "body": 'You got a new notification.',
                });
            }
        };
    ; sendDeviceToken(); getNotifications();}, []);

    const componentRef = React.useRef();

    const seeFeedback = (e) => {
        // navigate('/practice/feedback');
        // localStorage.setItem('selected_practice', )
        // localStorage.setItem('', )
        console.log(e.target.id)
        
    }
    
    return(
        <div>
            <Popup trigger={<img className="icon cursor" src={image} alt='notification' />} position="bottom center">
                <div>
                    {
                        messages?.map((e) => {
                            return (
                                <NotificationItem key={e.id} id={e.id} title={e.title} body={e.body}> </NotificationItem>
                            )   
                        }) 
                    }
                </div>
            </Popup>
        </div>  
    )
}

export default NotificationWidget;