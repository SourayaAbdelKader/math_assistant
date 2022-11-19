import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Users from './Pages/Users';
import Editors from './Pages/Editors';
import Questions from './Pages/Questions';
import Tags from './Pages/Tags';
import Practice from './Pages/Practice';
import Solutions from './Pages/Solutions';

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
            </Routes>
          </Router>
        </div>
      );
    }
 export default App;