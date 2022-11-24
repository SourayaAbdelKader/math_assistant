import React from "react";
import {useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing style
import './widget.css';

// Importing images
import messageSent from '../images/sent.png';
import edit_icon from '../images/edit.png';

import UserAPI from "../hooks/UsersAPI";
import validEmail, {checkInputIsNumber, checkInputIsLevel, checkEmptyInput, getBase64} from '../Utils/Utils'

const EditProfile = (props) => {

    const componentRef = React.useRef();

    const profile = props.data;

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [phone, setphone] = useState(profile.phone);
    const [degree, setDegree] = useState(profile.degree);
    const [location, setLocation] = useState(profile.location);
    const [gender, setGender] = useState(profile.gender);
    const [image, setImage] = useState(profile.picture_url)
    const [birthdate, setBirthdate] = useState(profile.birthdate);
    const [openEdit, setOpenEdit] = useState(false); 
    const [isImage, setIsImage] = useState(false);
    const [message, setMessage] = useState('');

    const handleName = (event) => {
        let string = event.target.value;
        if (!checkEmptyInput(string)){
            setName(string)
        } 
        if (string.length == 0)  {setName(profile.name)}
    }

    const handleEmail = (event) => {
        let string = event.target.value;
        if (validEmail(string)){
            setEmail(string)
        } 
        if (string.length == 0) { setEmail(profile.email)}
    }

    const handleDegree = (event) => {
        let string = event.target.value;
        if (!checkEmptyInput(string)){
            setDegree(string)
        } 
        if (string.length == 0)  {setDegree(profile.degree)}
    }

    const handleGender= (event) => {
        let string = event.target.value;
        if (checkInputIsNumber(string)){
            setGender(string)
        } 
        if (string.length == 0){setGender(profile.gender)}
    }

    const handleBirthdate = (event) => {
        let string = event.target.value;
        if (checkInputIsNumber(string)){
            setBirthdate(string)
        } if (string.length == 0){ setBirthdate(profile.birthdate)}
    }

    const handlePhone = (event) => {
        let string = event.target.value;
        if (checkInputIsNumber(string)){
            setphone(string)
        } if (string.length == 0){setphone(profile.birthdate)}
    }

    const handleLocation = (event) => {
        let string = event.target.value;
        if (checkInputIsNumber(string)){
            setLocation(string)
        } if (string.length == 0){setLocation(profile.birthdate)}
    }
 
    const handleImage = (event) => {
        let file = event.target.files[0];
        if (file){
            getBase64(file, (base64srting) => {
                setImage(base64srting);
            })
            setIsImage(true)
        } if (file.length == 0){setImage(profile.picture_url)}
    }

    const submitprofile = (e) => {
        e.preventDefault();
            editprofiles(localStorage.getItem('user_id'), name, email, phone, degree, gender, birthdate, location, image)
        }

    // Calling the API
    const editprofiles = async (id, name, email, phone, degree, gender, birthdate, location, picture_url) => {
        const edit_profile = await UserAPI.editProfile(id, {
            "name":name,
            "email":email,
            "phone":phone,
            "degree":degree,
            "gender": gender,
            "birthdate": birthdate,
            "location":location,
            "picture_url":picture_url, 
        });
        if (edit_profile.data.status == '200'){
            setOpen(true)
            componentRef.current.classList.add('hide');
        } else {componentRef.current.classList.remove('hide');
        setMessage(edit_profile.data.data.description)};
    };

    return(
        <div key={props.id} id={props.id} className='pointer'> 
            <Popup trigger={<div> <button className="login bold"> EDIT PROFILE </button> </div>} modal nested >
                        {close => (
                            <div className="modal">
                            <button className="close" onClick={close}>
                            &times;
                            </button>
                            <div className='modal_content'>
                                <div className="header center space"> <h3> Edit Profile </h3> </div>
                                <div className="flex"> 
                                    <div className="space row space_right"> <input onChange={handleName} className="input"  type="text" placeholder="Name" /></div>
                                    <div className="space row"> <input onChange={handleEmail} className="input" type="text" placeholder="Email" /></div>
                                </div>
                                <div className="flex"> 
                                    <div className="space row space_right"> <input onChange={handlePhone} className="input"  type="text" placeholder="Phone"/></div>
                                    <div className="space row"> <input onChange={handleDegree} className="input"  type="text" placeholder="Degree" /></div>
                                </div>
                                <div className="flex"> 
                                    <div className="space row space_right"> <input onChange={handleGender} className="input"  type="text" placeholder="Gender"/></div>
                                    <div className="space row"> <input onChange={handleBirthdate} className="input"  type="date" placeholder="Birthdate"/></div>
                                </div>
                                <div className="space row"> <input onChange={handleLocation} className="input"  type="text" placeholder="Location"/></div>

                                <div className='flex'> 
                                <div className="parent-div">
                                    <button className="btn-upload"> Add Picture </button>
                                    <input onChange={handleImage} type="file" name="upfile" />
                                </div>
                                { isImage && (<div> <img className='space_left' src={image} alt='pic'/> </div>)}
                                </div>
                                {
                                    open && (<div className='message_sent'> <img className='medium_icon' src={messageSent} alt='sent'/> Profile Edited Successfully </div>)
                                }
                                <div> <p ref={node => componentRef.current = node} className="error_text hide space"> Invalid Inputs </p> </div>                                                
                                <div className="actions flex_around">
                                <button onClick={submitprofile} className="login bold space_right"> Submit </button>
                                <button className="login" onClick={() => {close();}}> Cancel </button>
                            </div>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export default EditProfile;