import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}from 'react-router-dom';

// ________________ Math Assistant ________________
// ________________ Admin/Editor Frontend ________________
// For now the admin and editor have the same features, the editor have just an aditional feature, he can check users solution on a practice exercice.
// I kept them as two different user types to be abel in the future to distinguish more features for the admin and for the editor as well.
// For now, they can check the data on the website (users info, editors info, tags, questions, practices, users solutions)
// They can add an editor and send feedback for a user.

import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Users from './Pages/Users';
import Editors from './Pages/Editors';
import Questions from './Pages/Questions';
import Tags from './Pages/Tags';
import Practice from './Pages/Practice';
import Solutions from './Pages/Solutions';
import CheckSolution from './Pages/CheckSolution';
import ViewFeedback from './Pages/ViewFeedback';
import Profile from './Pages/Profile';
import ViewQuestion from './Pages/ViewQuestion';
import UserProfile from './Pages/UserProfile';

function App() {
  return (
          <div>
          <Router>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/users' element={<Users />} />
              <Route path='/editors' element={<Editors />} />
              <Route path='/questions' element={<Questions />} />
              <Route path='/tags' element={<Tags />} />
              <Route path='/practice' element={<Practice />} />
              <Route path='/solutions' element={<Solutions />} />
              <Route path='/checkSolution' element={<CheckSolution />} />
              <Route path='/view/checkSolution' element={<ViewFeedback />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/question' element={<ViewQuestion />} />
              <Route path='/user/profile' element={<UserProfile />} />
            </Routes>
          </Router>
        </div>
      );
    }
 export default App;