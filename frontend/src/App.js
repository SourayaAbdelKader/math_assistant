import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './Pages/Home';
import Tags from './Pages/Tags';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Questions from './Pages/Questions';
import SearchPage from './Pages/SearchPage';
import AskQuestion from './Pages/AskQuestion';
import Practice from './Pages/Practice';
import Profile from './Pages/Profile';
import ViewSolve from './Pages/ViewSolved';
import ViewQuestion from './Pages/ViewQuestion';
import Exercice from './Pages/Exercice';
import Feedback from './Pages/Feedback';

import { useState, useEffect } from 'react';
import {  onMessageListener, getTokens } from './firebase';
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import UserAPI from './hooks/userAPI';

function App() {

  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  useEffect(() =>{
    const sendDeviceToken  = async () =>{
        const token = await UserAPI.deviceToken({
          "id":localStorage.getItem("user_id"),
          "device_token":localStorage.getItem("device_token"),
      });
    //   const notification = await UserAPI.sendNotification({
    //     "id": 15,
    //     "title": "testing ",
    //     "body": 'my limits'
    // });
    console.log(notification)
    getTokens(setTokenFound)
    onMessageListener().then(payload => {
          setNotification({title: payload.notification.title, body: payload.notification.body})
    }).catch(err => console.log('failed: ', err));
}; sendDeviceToken();}, []);

  return (
          <div>
          <Router>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/tags' element={<Tags />} />
              <Route path='/questions' element={<Questions />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/askQuestion' element={<AskQuestion />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/practice' element={<Practice />} />
              <Route path='/practice/exercice' element={<Exercice />} />
              <Route path='/practice/solved' element={<ViewSolve />} />
              <Route path='/question' element={<ViewQuestion />} />
              <Route path='/practice/feedback' element={<Feedback />} />
            </Routes>
          </Router>
        </div>
      );
    }
 export default App;

