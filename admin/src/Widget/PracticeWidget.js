import React from "react";
import {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing style
import './widget.css';

// Importing images
import delete_icon from '../images/delete.png';
import edit_icon from '../images/edit.png';

const PracticeWidget = (props) => {

    // Handeling navigation
    const navigate = useNavigate();
    const navigateSolutions= () => {navigate('/solutions'); localStorage.setItem('choosed_practice', props.id)};
    
    return(
        <div key={props.id} id={props.id} className='flex_between row_table'> 
            <div onClick={navigateSolutions} className='cell pointer'> {props.title} </div>
            <div className='cell'> {props.description} </div>
            <div className='cell'> {props.level} </div>
            <div className='cell'> {props.points} </div>
            <div className=' flex_end pointer'> <img className="icon_table" src={edit_icon} alt='edit'/> </div>
            <div className=' flex_end pointer'> <img className="icon_table" src={delete_icon} alt='edit'/> </div>
        </div>
    )
}

export default PracticeWidget;