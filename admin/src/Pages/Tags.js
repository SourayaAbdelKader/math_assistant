import React from 'react';
import './pages.css';
import {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing Components
import messageSent from '../images/sent.png';
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import TagNav from '../Components/Navbar/TagNav';
import TableWidget from '../Widget/TableWidget';

import {checkInputIsNumber, checkInputIsLevel, checkEmptyInput, getBase64} from '../Utils/Utils'

import TagAPI from '../hooks/TagAPI';

const Tags = () => {

    const componentRef = React.useRef();

    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false); 

    useEffect(() =>{
        const getUsers  = async () =>{
            const get_users = await TagAPI.getTags();
            console.log(get_users)
            if (get_users.data.message === 'Found'){
                const get = get_users.data.data;
                setTags(get);
            }
    }; getUsers();}, [])

    const handleTitle = (event) => {
        let string = event.target.value;
        if (!checkEmptyInput(string)){
            setTitle(string)
        }
    }

    const handleDescription = (event) => {
        let string = event.target.value;
        if (!checkEmptyInput(string)){
            setDescription(string)
        }
    }

    const validInputs = (title, description) => {
        if (title && description){
            return true;
        } 
        return false;
    }

    const submitPractice = (e) => {
        e.preventDefault();
        if (validInputs(title, description)){
            addTag(title, description)
        } else {
            setMessage('Invalid Inputs')
            componentRef.current.classList.remove('hide');
        }
    }

    // Calling the API
    const addTag = async (title, description) => {
        const add_tag = await TagAPI.addTag({
            "title":title,
            "description":description,
        });
        console.log(add_tag)
        if (add_tag.data.message == 'Added Successfully'){
            setOpen(true)
            componentRef.current.classList.add('hide');
            setTitle('');
            setDescription('');
        } else {componentRef.current.classList.remove('hide');
            setMessage(add_tag.data.message)
    };
};

    return (
        <div>
            <Header></Header>
            <div className='page_content '>
                <div className='navbar'> <TagNav></TagNav></div>
                <div className='content'>
                <div className='flex_between space'> 
                    <h3>Tags</h3>
                    <Popup trigger={<button className='login bold'>ADD TAG</button>} modal nested >
                        {close => (
                            <div className="modal">
                            <button className="close" onClick={close}>
                            &times;
                            </button>
                                <div className='modal_content'>
                                        <div className="header center space"> <h3> Add Tag </h3> </div>
                                        <div className="space row"> <input onChange={handleTitle} className="input"  type="text" placeholder="Title" /></div>
                                        <div className="space row"> <input onChange={handleDescription}  className="input"  type="text" placeholder="Description"/></div>
                                        {
                                            open && (<div className='message_sent'> <img className='medium_icon' src={messageSent} alt='sent'/> Tag Added Successfully </div>)
                                        }
                                        <div> <p ref={node => componentRef.current = node} className="error_text hide space"> {message} </p> </div>                                                
                                        <div className="actions flex_around">
                                        <button  onClick={(e) => {submitPractice(e); setTimeout(() => {close(); setOpen(false)}, 2000);}} className="login bold space_right"> Submit </button>
                                        <button className="login" onClick={() => {close();}}> Cancel </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Popup>
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