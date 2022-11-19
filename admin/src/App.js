import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

function App() {

  return (
          <div>
          <Router>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
          </Router>
        </div>
      );
    }
 export default App;