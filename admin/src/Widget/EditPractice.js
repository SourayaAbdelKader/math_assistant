import React from "react";
import {useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing style
import './widget.css';

// Importing images
import messageSent from '../images/sent.png';
import edit_icon from '../images/edit.png';

import PracticeAPI from "../hooks/PracticeAPI";
import {checkInputIsNumber, checkInputIsLevel, checkEmptyInput, getBase64} from '../Utils/Utils'

const EditPractice = (props) => {

    const componentRef = React.useRef();

    const practice = props.data;

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(practice.title);
    const [description, setDescription] = useState(practice.description);
    const [level, setLevel] = useState(practice.level);
    const [points, setPoints] = useState(practice.points);
    const [image, setImage] = useState(practice.picture_url);
    const [tagNumber, setTagNumber] = useState(practice.tag_id);
    const [openEdit, setOpenEdit] = useState(false); 
    const [isImage, setIsImage] = useState(false);
    const [message, setMessage] = useState('');

    const handleTitle = (event) => {
        let string = event.target.value;
        if (!checkEmptyInput(string)){
            setTitle(string)
        } 
        if (string.length == 0)  {setTitle(practice.title)}
    }

    const handleDescription = (event) => {
        let string = event.target.value;
        if (!checkEmptyInput(string)){
            setDescription(string)
        } if (string.length == 0) { setDescription(practice.description)}
    }

    const handleLevel = (event) => {
        let string = event.target.value;
        if (checkInputIsLevel(string)){
            setLevel(string)
        } if (string.length == 0)  {setLevel(practice.level)}
    }

    const handlePoints= (event) => {
        let string = event.target.value;
        if (checkInputIsNumber(string)){
            setPoints(string)
        } if (string.length == 0)  {setPoints(practice.points)}
    }

    const handleTag = (event) => {
        let string = event.target.value;
        if (checkInputIsNumber(string)){
            setTagNumber(string)
        } if (string.length == 0)  { setTagNumber(practice.tag_id)}
    }
 
    const handleImage = (event) => {
        let file = event.target.files[0];
        if (file){
            getBase64(file, (base64srting) => {
                setImage(base64srting);
            })
            setIsImage(true)
        } if (file.length == 0)  {setImage(practice.picture_url)}
    }

    const validInputs = (title, description, points, level, tagNumber) => {
        if (title && description && points && level && tagNumber){
            return true;
        } 
        return false;
    }

    const submitPractice = (e) => {
        e.preventDefault();
        if (validInputs(title, description, points, level, tagNumber)){
            editPractices(title, description, points, level, image, localStorage.getItem('user_id'), tagNumber)
        } else {
            setMessage('Invalid Inputs')
            componentRef.current.classList.remove('hide');
        }
    }

    // Calling the API
    const editPractices = async (title, description, points, level, picture_url, user_id, tag_id) => {
        const add_practice = await PracticeAPI.editPractice(practice.id, {
            "name":title,
            "description":description,
            "points":points,
            "level":level,
            "picture_url": picture_url,
            "user_id": user_id,
            "tag_id":tag_id, 
        });
        if (add_practice.data.status == '200'){
            setOpen(true)
            componentRef.current.classList.add('hide');
            setTitle('');
            setDescription('');
            setImage('');
            setPoints('');
            setLevel('');
            setTagNumber('');
        } else {componentRef.current.classList.remove('hide');
        setMessage(add_practice.data.data.description)
    };};

    return(
        <div key={props.id} id={props.id} className='pointer'> 
            <Popup trigger={<img className="icon_table" src={edit_icon} alt='edit'/>} modal nested >
                        {close => (
                            <div className="modal">
                            <button className="close" onClick={close}>
                            &times;
                            </button>
                            <div className='modal_content'>
                                <div className="header center space"> <h3> Edit Practice </h3> </div>
                                <div className="space row"> <input onChange={handleTitle} className="input"  type="text" placeholder={practice.title} /></div>
                                <div className="space row"> <input onChange={handleDescription} className="input" type="text" placeholder={practice.description} /></div>
                                <div className="space row"> <input onChange={handlePoints} className="input"  type="text" placeholder={practice.points} /></div>
                                <div className="space row"> <input onChange={handleLevel} className="input"  type="text" placeholder={practice.level} /></div>
                                <div className="space row"> <input onChange={handleTag} className="input"  type="text" placeholder={practice.tag_id}/></div>
                                <div className='flex'> 
                                <div className="parent-div">
                                    <button className="btn-upload"> Add Picture </button>
                                    <input onChange={handleImage} type="file" name="upfile" />
                                </div>
                                { isImage && (<div> <img className='space_left' src={image} alt='pic'/> </div>)}
                                </div>
                                {
                                    open && (<div className='message_sent'> <img className='medium_icon' src={messageSent} alt='sent'/> Practice Added Successfully </div>)
                                }
                                <div> <p ref={node => componentRef.current = node} className="error_text hide space"> Invalid Inputs </p> </div>                                                
                                <div className="actions flex_around">
                                <button onClick={submitPractice} className="login bold space_right"> Submit </button>
                                <button className="login" onClick={() => {close();}}> Cancel </button>
                            </div>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export default EditPractice;