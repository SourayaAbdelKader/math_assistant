import React from 'react';
import {useState, useEffect} from 'react';

// Importing styling
import './pages.css';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import UserNav from '../Components/Navbar/UserNav';
import UserRow from '../Components/Cards/UserRow';

// Importing hooks
import UsersAPI from '../hooks/UsersAPI';

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() =>{
        const getUsers  = async () =>{
            const get_users = await UsersAPI.getUser();
            if (get_users.data.message === 'Found'){
                const get = get_users.data.data;
                setUsers(get);
            }
    }; getUsers();}, [])

    return (
        <div>
            <div className='header'>
            <Header></Header>
            </div>
            <div className='page_content'>
                <div className='navbar'> <UserNav></UserNav></div>
                <div className='content'>
                    <div> <h3 className='space'>Users</h3></div>
                    <div className='flex_between row_table'> 
                        <div className='user_column bold'> Name </div>
                        <div className='user_column bold'> Email </div>
                        <div className='user_column bold'> Phone </div>
                        <div className='user_column bold'> Degree </div>
                    </div>
                    { 
                        users?.map((e) => {                            
                            return (
                                <UserRow key={e.id} id={e.id} name={e.name} email={e.email} phone={e.phone} degree={e.degree}> </UserRow>
                           )
                        })  
                    }
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Users;