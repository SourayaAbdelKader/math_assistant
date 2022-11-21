import React from 'react';
import './pages.css';
import {useState, useEffect} from 'react';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import TagNav from '../Components/Navbar/TagNav';
import TableWidget from '../Widget/TableWidget';

import TagAPI from '../hooks/TagAPI';

const Tags = () => {

    const [tags, setTags] = useState([]);
    useEffect(() =>{
        const getUsers  = async () =>{
            const get_users = await TagAPI.getTags();
            console.log(get_users)
            if (get_users.data.message === 'Found'){
                const get = get_users.data.data;
                setTags(get);
            }
    }; getUsers();}, [])

    return (
        <div>
            <Header></Header>
            <div className='page_content '>
                <div className='navbar'> <TagNav></TagNav></div>
                <div className='content'>
                <div className='flex_between space'> 
                    <h3>Tags</h3>
                    <button className='login bold'>ADD TAG</button>
                </div>
                <div className='flex_between row_table'> 
                        <div className='column bold'> Title </div>
                        <div className='column bold'> Description </div>
                        <div className='bold'> Edit </div>
                        <div className='bold'> Delete </div>
                    </div>
                    { 
                            tags?.map((e) => {                            
                                return (
                                    <TableWidget id={e.id} title={e.title} description={e.description}></TableWidget>
                                )
                            })  
                    }
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Tags;