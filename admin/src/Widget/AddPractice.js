import React from "react";
import {useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing style and assets
import './widget.css';
import messageSent from '../images/sent.png';

// Importing utils function

import PracticeAPI from '../hooks/PracticeAPI';

import {checkInputIsNumber, checkInputIsLevel, checkEmptyInput, getBase64} from '../Utils/Utils'

const AddPractice = (props) => {

    const componentRef = React.useRef();

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [level, setLevel] = useState();
    const [points, setPoints] = useState();
    const [image, setImage] = useState('');
    const [tagNumber, setTagNumber] = useState();
    const [open, setOpen] = useState(false); 
    const [isImage, setIsImage] = useState(false);
    const [message, setMessage] = useState('');

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

    const handleLevel = (event) => {
        let string = event.target.value;
        if (checkInputIsLevel(string)){
            setLevel(string)
        }
    }

    const handlePoints= (event) => {
        let string = event.target.value;
        if (checkInputIsNumber(string)){
            setPoints(string)
        }
    }

    const handleTag = (event) => {
        let string = event.target.value;
        if (checkInputIsNumber(string)){
            setTagNumber(string)
        }
    }
 
    const handleImage = (event) => {
        let file = event.target.files[0];
        if (file){
            getBase64(file, (base64srting) => {
                setImage(base64srting);
            })
            setIsImage(true)
        }
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
            addPractice(title, description, points, level, image, localStorage.getItem('user_id'), tagNumber)
        } else {
            setMessage('Invalid Inputs')
            componentRef.current.classList.remove('hide');
        }
    }

     // Calling the API
     const addPractice = async (title, description, points, level, picture_url, user_id, tag_id) => {
        const add_practice = await PracticeAPI.addPractice({
            "name":title,
            "description":description,
            "points":points,
            "level":level,
            "picture_url": picture_url,
            "user_id": user_id,
            "tag_id":tag_id, 
        });
        if (add_practice.data.message == 'Added Successfully'){
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
        <div key={props.id} id={props.id} className=''> 
            <Popup trigger={<button className='login bold'>ADD PRACTICE</button>} modal nested >
                {close => (
                    <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className='modal_content'>
                        <div className="header center space"> <h3> Add Practice </h3> </div>
                        <div className="space row"> <input onChange={handleTitle} className="input"  type="text" placeholder="Title" /></div>
                        <div className="space row"> <input onChange={handleDescription} className="input" type="text" placeholder="Description" /></div>
                        <div className="space row"> <input onChange={handlePoints} className="input"  type="text" placeholder="Points" /></div>
                        <div className="space row"> <input onChange={handleLevel} className="input"  type="text" placeholder="Level" /></div>
                        <div className="space row"> <input onChange={handleTag} className="input"  type="text" placeholder="Tag Number" /></div>
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
                        <div> <p ref={node => componentRef.current = node} className="error_text hide space"> {message} </p> </div>                                                
                            <div className="actions flex_around">
                                <button  onClick={(e) => {submitPractice(e); setTimeout(() => close(), 2000);}} className="login bold space_right"> Submit </button>
                                <button className="login" onClick={() => {close();}}> Cancel </button>
                            </div>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export default AddPractice;