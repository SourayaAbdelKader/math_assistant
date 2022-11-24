import React from 'react';
import {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';

// Importing styles
import './pages.css';
import 'reactjs-popup/dist/index.css';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import TagNav from '../Components/Navbar/TagNav';
import TableWidget from '../Widget/TableWidget';
import AddTag from '../Widget/AddTag';


// Importing hooks
import TagAPI from '../hooks/TagAPI';

const Tags = () => {

    const [tags, setTags] = useState([]);

    useEffect(() =>{
        const getAllTags  = async () =>{
            const get_users = await TagAPI.getTags();
            if (get_users.data.message === 'Found'){
                const get = get_users.data.data;
                setTags(get);
            }
    }; getAllTags();}, [])

    return (
        <div>
            <Header></Header>
            <div className='page_content '>
                <div className='navbar'> <TagNav></TagNav></div>
                <div className='content'>
                <div className='flex_between space'> 
                    <h3>Tags</h3>
                    <AddTag></AddTag>
                </div>
                <div className='flex_between row_table'> 
                        <div className='column_title bold'> Title </div>
                        <div className='column bold'> Description </div>
                        <div className='column_icon bold'> Edit </div>
                        <div className='column_icon bold'> Delete </div>
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