import React from 'react';
import './pages.css'

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import UserNav from '../Components/Navbar/UserNav';
const Users = () => {
    return (
        <div>
            <Header></Header>
            <div className='page_content flex'>
                <div className='navbar'> <UserNav></UserNav></div>
                <div className='content'>
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Users;