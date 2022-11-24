import React from "react";
import {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing base url
import SetUser from "../hooks/setUser";
import  secureLocalStorage  from  "react-secure-storage";
import validEmail, { validPassword} from '../Utils/Utils';

// Importing style
import './widget.css';

// Importing images
import back from '../images/loginBack.png';
import logo from '../images/logo.png';


const LoginWidget = () => {
    
    // Getting the error div
    const componentRef = React.useRef();

    // Handeling navigation
    const navigate = useNavigate();
    const navigateHome= () => {navigate('/');};

    // For the inputs
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();

    // When input is changing this function will get called
    function handleChange(event) {
        let email = event.target.value;
        if(! validEmail(email)){ 
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        } else { 
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        if (email.length == 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        setEmail(email);
    }

    function handlePassword(event){
        let password = event.target.value;
        if(! validPassword(password)){ 
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        } else { 
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');         
        }
        if (password.length == 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        setPassword(password);
    }
    
    // Submitting inputs
    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password); 
    }

    // Calling the API
    const login = async(email, password) => {
        const login_user = await SetUser.login({
            "email":email,
            "password":password,
        });
        if (login_user){
            if (login_user.status !== 200 || login_user.data.status === 'Authorization Token not found') {
                componentRef.current.classList.remove('hide');
            } else {
                localStorage.setItem('user_id', login_user.data.user.id);
                localStorage.setItem('user_name', login_user.data.user.name);
                localStorage.setItem('user_email', login_user.data.user.email);
                secureLocalStorage.setItem('token', login_user.data.authorisation.token.trim());
                navigate('/dashboard');
            }
        } else {componentRef.current.classList.remove('hide');};
        setPassword('');
        setEmail('');
     };

    return(
        <div className="login_card">
            <div className="flex_start pointer" onClick={navigateHome}> <img className="s_icon" src={back} alt="back" />  </div>
            <div className="flex"> 
                <div className="space"> <img className="logo" src={logo} alt="logo" /> </div>
                <div className="space"> <h3> Math Assistant</h3> </div>
            </div> 
            <div className="space row"> <input className="input" onChange={handleChange} type="email" placeholder="Email" /></div>
            <div className="space row"> <input className="input" onChange={handlePassword} type="password" placeholder="Password" /> </div>
            <div> <p ref={node => componentRef.current = node} className="error_text hide space"> Credentials Not Valid </p> </div>
            <div> <button className="button space" type="submit" onClick={onSubmit}> Login </button>  </div>
        </div>
    )
}

export default LoginWidget;