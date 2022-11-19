import React from 'react';
import {useState, useEffect} from 'react';
import './pages.css';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import UserNav from '../Components/Navbar/UserNav';

const Solutions = () => {

    return (
        <div>
            <div className='header'>
            <Header></Header>
            </div>
            <div className='page_content'>
                <div className='navbar'> <UserNav></UserNav></div>
                <div className='content'>
                    <div> <h3 className='space'>Solutions</h3></div>


                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Solutions;