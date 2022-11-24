import React from "react";
import {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing style
import './widget.css';

// Importing images
import delete_icon from '../images/delete.png';
import EditPractice from "./EditPractice";
import PracticeAPI from "../hooks/PracticeAPI";

const PracticeWidget = (props) => {

    const [open, setOpen] = useState(false);
    // Deleting a practice

    const submitDelete = (e) => {
        e.preventDefault();
        deletePractice(props.id)
    }

    const deletePractice = async (id) => {
        const delete_tag = await PracticeAPI.deletePractice(id);
        setOpen(true)
    }

    // Handeling navigation
    const navigate = useNavigate();
    const navigateSolutions= () => {navigate('/solutions'); localStorage.setItem('choosed_practice', props.id)};
    
    return(
        <div key={props.id} id={props.id} className='flex_between row_table'> 
            <div onClick={navigateSolutions} className='user_column pointer'><p>{props.id} {props.title}</p> </div>
            <div className='column_title'> {props.level} </div>
            <div className='column_title'> {props.points} </div>
            <EditPractice key={props.id} data={props} ></EditPractice>
            <div className='column_icon  pointer'> <img onClick={submitDelete} className="icon_table" src={delete_icon} alt='edit'/> </div>         
            <Popup open={open} modal nested >
                {close => (
                    <div className="modal flex">
                        <button className="close space_right" onClick={close}>
                        &times;
                        </button>
                        <div><h3>Practice Deleted</h3></div>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export default PracticeWidget;