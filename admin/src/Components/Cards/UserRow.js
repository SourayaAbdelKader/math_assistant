import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing style
import './cards.css';

const UserRow = (details) => {

    const navigateUserProfile = (e) => {
        e.preventDefault();
        localStorage.setItem('choosed_user', details.id);
        navigate('/user/profile');
    };
    const navigate = useNavigate();

    return(
        <div id={details.id} key={details.id} className='flex_between row_table'> 
            <div onClick={navigateUserProfile} className='user_column pointer'> {details.name} </div>
            <div className='user_column'> {details.email} </div>
            <div className='user_column'> {details.phone} </div>
        <div className='user_column'> {details.degree} </div>
        </div>
    )
}

export default UserRow;