import React from 'react';
import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// ________________ Notification ________________
// For the notification, their is a table in the backend to keep track of the checked and unchecked notifications.
// For the push notification, a third party API is integrated (firebase)

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
    const [empty, setEmpty] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() =>{
        const sendDeviceToken  = async () =>{
            const token = await UserAPI.deviceToken({
            "id":localStorage.getItem("user_id"),
            "device_token":localStorage.getItem("device_token"),
        });}

        const getNotifications  = async () =>{
            const notification = await UserAPI.getNotificationForUser(localStorage.getItem('user_id'));
            if (notification.data.message == 'Found' && notification.data.data.length > 0){
                setMessages(notification.data.data);
                setImage(full_notifiation);
                getTokens(setTokenFound)
                onMessageListener().then(payload => {
                        setNotification({title: payload.notification.title, body: payload.notification.body})
                }).catch(err => console.log('failed: ', err));
                if (!sent){
                    const push_notification = await UserAPI.sendNotification({
                    "id": 15, // the id is hard coded because it's the device id on which i'm testing the push notification
                    "title": "Math Assistant",
                    "body": 'You got a new notification.',
                });
                setSent(true);
                }

            } else {setEmpty(true)}
        };
    ; sendDeviceToken(); getNotifications();}, []);
    
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
                    {
                        empty && (<div> <p> No new notifications </p> </div>)
                    }
                </div>
            </Popup>
        </div>  
    )
}

export default NotificationWidget;