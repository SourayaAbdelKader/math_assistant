import React from "react";
import {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing style
import './widget.css';

const SolutionWidget = (props) => {
    
    return(
        <div key={props.id} id={props.id} className='flex_between row_table'> 
            <div className='column '> {props.id}</div>
            <div className='column '> {props.status} </div>
        </div>
    )
}

export default SolutionWidget;