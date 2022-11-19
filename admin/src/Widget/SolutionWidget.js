import React from "react";
import {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing style
import './widget.css';

const SolutionWidget = (props) => {
    const navigate = useNavigate();

    const onClick =(e) =>{
        e.preventDefault();
        localStorage.setItem('choosed_solution', props.id);
        navigate('/checkSolution')
    }

    return(
        <div onClick={onClick} key={props.id} id={props.id} className='flex_between row_table pointer'> 
            <div className='column '> {props.id}</div>
            <div className='column '> {props.status} </div>
        </div>
    )
}

export default SolutionWidget;