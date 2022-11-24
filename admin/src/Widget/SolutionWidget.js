import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing style
import './widget.css';

// This is considered as widget for a future editing (giving the admin access to alter the user's solutions.
const SolutionWidget = (props) => {
    const navigate = useNavigate();

    const onClick =(e) =>{
        e.preventDefault();
        localStorage.setItem('choosed_solution', props.id);
        if (props.status == 'Unchecked'){
            navigate('/checkSolution')
        } else {navigate('/view/checkSolution')}
    }

    return(
        <div onClick={onClick} key={props.id} id={props.id} className='flex_between row_table pointer'> 
            <div className='column '> {props.id}</div>
            <div className='column '> {props.status} </div>
        </div>
    )
}

export default SolutionWidget;