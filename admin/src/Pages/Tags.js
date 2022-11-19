import React from 'react';
import './pages.css'

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import TagNav from '../Components/Navbar/TagNav';

const Tags = () => {
    return (
        <div>
            <Header></Header>
            <div className='page_content flex'>
                <div className='navbar'> <TagNav></TagNav></div>
                <div className='content'>
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Tags;