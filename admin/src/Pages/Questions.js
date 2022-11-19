import React from 'react';
import './pages.css'

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import Navbar from '../Components/Navbar/Navbar';

const Questions = () => {
    return (
        <div>
            <Header></Header>
            <div className='page_content flex'>
                <div className='navbar'> <Navbar></Navbar></div>
                <div className='content'>
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Questions;