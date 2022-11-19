import React from 'react';
import { useState, useEffect } from 'react';
import './pages.css'

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import EditorNav from '../Components/Navbar/EditorNav';
import UsersAPI from '../hooks/UsersAPI';

const Editors = () => {

    const [editors, setEditors] = useState([]);
    useEffect(() =>{
        const getUsers  = async () =>{
            const get_users = await UsersAPI.getEditors();
            console.log(get_users)
            if (get_users.data.message === 'Found'){
                const get = get_users.data.data;
                setEditors(get);
            }
    }; getUsers();}, [])
    
    return (
        <div>
            <Header></Header>
            <div className='page_content'>
                <div className='navbar'> <EditorNav></EditorNav></div>
                <div className='content'>
                    <div className='flex_between space'> 
                        <h3 className=''>Editors</h3>
                        <button className='login bold'>ADD EDITOR</button>
                    </div>
                    <div className='flex_between row_table'> 
                        <div className='column bold'> Name </div>
                        <div className='column bold'> Email </div>
                        <div className='column bold'> Phone </div>
                        <div className='column bold'> Degree </div>
                    </div>
                    { 
                            editors?.map((e) => {                            
                                return (
                                    <div key={e.id} className='flex_between row_table'> 
                                    <div className='column'> {e.name} </div>
                                    <div className='column'> {e.email} </div>
                                    <div className='column'> {e.phone}  </div>
                                    <div className='column'> {e.degree}  </div>
                                    </div>
                                )
                            })  
                    }
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Editors;