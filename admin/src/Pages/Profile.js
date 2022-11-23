import React from 'react';
import { useState, useEffect } from 'react';

// Importing style
import '../App.css';

// Importing components
import LowerFooter from '../Components/LowerFooter';
import ProfileHeader from '../Components/Headers/ProfileHeader';
import ProfileNav from '../Components/Navbar/ProfileNav';
import UserInfo from '../Components/Cards/UserInfo';

// Importing hooks
import UserAPI from "../hooks/UsersAPI";

const Profile = () => {

    const [details, setDetails] =useState([]);

    useEffect(() =>{
        const getUserData  = async () =>{
            const user_data = await UserAPI.getUserById(localStorage.getItem('user_id'));
            const get = user_data.data.data[0];
            setDetails(get);
    }; getUserData();}, []); 

    return (
        <div>
            <ProfileHeader></ProfileHeader>
            <div className='page_content'> 
                <ProfileNav></ProfileNav>
                <div className='content'>
                <div> <h3 className='space'> My Profile </h3> </div>
                <div> 
                    <UserInfo 
                        id={details.id}    
                        name={details.name} 
                        gender={details.gender}
                        location={details.location}
                        degree={details.degree}
                        birthdate={details.birthdate}
                        email={details.email}
                        phone={details.phone}
                    > 
                    </UserInfo> 
                </div>

                </div>
            </div>
        <LowerFooter></LowerFooter>
        </div>
    );
};
    
export default Profile;