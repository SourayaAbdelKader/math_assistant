import React from 'react';
import './pages.css'

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import PracticeNav from '../Components/Navbar/PracticeNav';

const Practice = () => {
    return (
        <div>
            <Header></Header>
            <div className='page_content flex'>
                <div className='navbar'> <PracticeNav></PracticeNav></div>
                <div className='content'>
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Practice;