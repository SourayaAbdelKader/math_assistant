import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// ________________ Math Assistant ________________
// ________________ User Frontend ________________
// Math assistant is a website where people can share their math problems by scaning the problem or typing it.
// Users can answer other users questions.
// Plus, users can practice solving math problems.
// I added some comments to the important pages and parts (widgets) of this website, to explain more how things work.

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
import UserProfile from './Pages/UserProfile';

function App() {

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
              <Route path='/user/profile' element={<UserProfile />} />
            </Routes>
          </Router>
        </div>
      );
    }
 export default App;

