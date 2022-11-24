import React from "react";

// Importing style
import './cards.css';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing images
import profileSelected from '../../images/profileSelected.png';
import EditProfile from "../../Widget/EditProfile";

const UserRow = (details) => {

    const navigateUserProfile = (e) => {
        e.preventDefault();
        localStorage.setItem('choosed_user', details.id);
        console.log(localStorage.getItem('choosed_user'))
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