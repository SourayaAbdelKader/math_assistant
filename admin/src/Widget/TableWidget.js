import React from "react";
import {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing style
import './widget.css';

// Importing images
import delete_icon from '../images/delete.png';
import edit_icon from '../images/edit.png';

const TableWidget = (props) => {
    
    return(
        <div key={props.id} id={props.id} className='flex_between row_table'> 
            <div className='column_title'> {props.title} </div>
            <div className='column'> {props.description} </div>
            <div className='column_icon flex_end pointer'> <img className="icon_table" src={edit_icon} alt='edit'/> </div>
            <div className='column_icon flex_end pointer'> <img className="icon_table" src={delete_icon} alt='edit'/> </div>
        </div>
    )
}

export default TableWidget;