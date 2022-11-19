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
            <div className='page_content'>
                <div className='navbar'> <UserNav></UserNav></div>
                <div className='content'>
                    <div> <h3 className='space'>Users</h3></div>
                    <div className='flex_between row'> 
                        <div className='column bold'> Name </div>
                        <div className='column bold'> Email </div>
                        <div className='column bold'> Score </div>
                    </div>
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Users;