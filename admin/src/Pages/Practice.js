import React from 'react';
import './pages.css';
import {useState, useEffect} from 'react';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import PracticeNav from '../Components/Navbar/PracticeNav';
import PracticeWidget from '../Widget/PracticeWidget';
import AddPractice from '../Widget/AddPractice';

// Importing hooks
import PracticeAPI from '../hooks/PracticeAPI';

const Practice = () => {

    const [practice, setPractice] = useState([]);

    useEffect(() =>{
        const getUsers  = async () =>{
            const get_users = await PracticeAPI.getPractices();
            if (get_users.data.message === 'Found'){
                const get = get_users.data.data;
                setPractice(get);
            }
    }; getUsers();}, []);

    return (
        <div>
            <Header></Header>
            <div className='page_content'>
                <div className='navbar'> <PracticeNav></PracticeNav></div>
                <div className='content'>
                <div className='flex_between space'> 
                    <h3>Practice</h3>
                    <AddPractice></AddPractice>
                </div>
                <div className='flex_between row_table'> 
                        <div className='user_column bold'> Title </div>
                        <div className='column_title bold'> Level </div>
                        <div className='column_title bold'> Points </div>
                        <div className='column_icon bold'> Edit </div>
                        <div className='column_icon bold'> Delete </div>
                </div>
                    { 
                        practice?.map((e) => {                            
                            return (
                                <PracticeWidget key={e.id} id={e.id} title={e.name} description={e.description} level={e.level} points={e.points} tag_id={e.tag_id}></PracticeWidget>
                            )
                        })  
                    }
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Practice;