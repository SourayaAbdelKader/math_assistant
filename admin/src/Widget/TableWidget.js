import React from "react";
import {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing style
import './widget.css';

import TagAPI from '../hooks/TagAPI';

// Importing images
import delete_icon from '../images/delete.png';
import edit_icon from '../images/edit.png';

const TableWidget = (props) => {

    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false); 

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
            <div className='column_icon flex_end pointer'> <img className="icon_table" src={edit_icon} alt='edit'/> </div>
            <div className='column_icon flex_end pointer'> <img onClick={submitDelete} className="icon_table" src={delete_icon} alt='edit'/> </div>
            <Popup open={open} modal nested >
                        {close => (
                            <div className="modal flex">
                                <button className="close space_right" onClick={close}>
                                &times;
                                </button>
                                <div> <h3>Tag Deleted</h3></div>
                            </div>
                        )}
                </Popup>
        </div>
    )
}

export default TableWidget;