import React from "react";
import {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing style
import './widget.css';
import messageSent from '../images/sent.png';

import TagAPI from '../hooks/TagAPI';

// Importing images
import delete_icon from '../images/delete.png';
import edit_icon from '../images/edit.png';

const TableWidget = (props) => {

    const componentRef = React.useRef();

    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    // Editing a tag
    const handleTitle = (event) => {
        let string = event.target.value;
        if (string.length > 0){
            setTitle(string);
        } else {
            setTitle(props.description)
        }
    }

    const handleDesciption = (event) => {
        let string = event.target.value;
        if (string.length > 0){
            setDescription(string);
        } else {
            setDescription(props.description)
        }
    }

    const editTag = async (id, title, description) => {
        const edit_tag = await TagAPI.editTag(id, {
            "title": title,
            "description": description
        });
        if (edit_tag.data.status == '200'){
            setOpen(true)
        } else {
            setMessage(edit_tag.data.message);
            componentRef.current.classList.remove('hide')
        }
        console.log(edit_tag.data.status)   
    }

    const submitEdit = (e) => {
        e.preventDefault();
        editTag(props.id, title, description);
    }

    // Deleting a tag

    const submitDelete = (e) => {
        e.preventDefault();
        deleteTag(props.id)
    }

    const deleteTag = async (id) => {
        const delete_tag = await TagAPI.deleteTag(id);
        setOpen(true)
    }
    
    return(
        <div key={props.id} id={props.id} className='flex_between row_table'> 
            <div className='column_title'> {props.title} </div>
            <div className='column'> {props.description} </div>
            <div className='column_icon flex_end pointer'> 
                <Popup trigger={<img className="icon_table" src={edit_icon} alt='edit'/> } modal nested >
                        {close => (
                            <div className="modal">
                            <button className="close" onClick={close}>
                            &times;
                            </button>
                                <div className='modal_content'>
                                        <div className="header center space"> <h3> Edit Tag </h3> </div>
                                        <div className="space row"> <input onChange={handleTitle} className="input"  type="text" placeholder={props.title}/></div>
                                        <div className="space row"> <input onChange={handleDesciption}  className="input"  type="text" placeholder={props.description}/></div>
                                        {
                                            open && (<div className='message_sent'> <img className='medium_icon' src={messageSent} alt='sent'/> Tag Added Successfully </div>)
                                        }
                                        <div> <p ref={node => componentRef.current = node} className="error_text hide space"> {message} </p> </div>                                                
                                        <div className="actions flex_around">
                                        <button onClick={submitEdit} className="login bold space_right"> Submit </button>
                                        <button className="login" onClick={() => {close();}}> Cancel </button>
                                    </div>
                                </div>
                            </div>
                        )}
                </Popup>
            </div>
            <div className='column_icon flex_end pointer'> <img onClick={submitDelete} className="icon_table" src={delete_icon} alt='edit'/> </div>
            <Popup open={open} modal nested >
                {close => (
                    <div className="modal flex">
                        <button className="close space_right" onClick={close}>
                        &times;
                        </button>
                        <div> <h3>Tag Edited</h3></div>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export default TableWidget;