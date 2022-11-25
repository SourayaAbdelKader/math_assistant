import React from "react";
import {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import validEmail, {validPassword, validName} from "../Utils/Utils";

// Importing hooks
import SetUser from "../hooks/setUser";
import  secureLocalStorage  from  "react-secure-storage";

// Importing style
import './widgets.css';

// Importing images
import back from '../images/loginBack.png';
import logo from '../images/logo.png';

const SignupWidget = () => {
    // Getting the error div
    const componentRef = React.useRef();

    // Handeling navigation
    const navigate = useNavigate();
    const navigateHome = () => {navigate('/');};

    const [email, setEmail] = useState() // For input
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    // Handeling the inputs
    function handleChange(event) {
        let email = event.target.value;
        if(! validEmail(email)){ 
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        } else { 
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        if (email.length === 0) {
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
        if (password.length === 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        setPassword(password);
    }

    function handleName(event) {
        let name = event.target.value;
        if(! validName(name)){ 
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        } else { 
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        if (name.length === 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        setName(name);
    }
    
    // Submitting inputs
    const onSubmit = (e) => {
        if (email && password && name){
            e.target.classList.remove('disabeled');
        }
        e.preventDefault();
        signUp(name, email, password); 
    }

    // Calling the API
    const signUp = async (name, email, password) => {
        const signup_user = await SetUser.signup({
            "name":name,
            "email":email,
            "password":password,
        });
        if (signup_user.data){
            if (signup_user.data.status !== 'success') {
                componentRef.current.classList.remove('hide');
              }
              else {
                localStorage.setItem('user_id', signup_user.data.user.id);
                localStorage.setItem('user_name', signup_user.data.user.name);
                localStorage.setItem('user_email', signup_user.data.user.email);
                secureLocalStorage.setItem('token', signup_user.data.authorisation.token.trim());
                navigate('/tags');
              }
        } else {componentRef.current.classList.remove('hide');}
        setEmail('');
        setPassword('');
        setName('');
     };

    return(
        <div className="login_card">
            <div className="flex_start pointer" onClick={navigateHome}> <img className="s_icon" src={back} alt="back" />  </div>
            <div className="flex">
                <div className="space"> <img className="logo" src={logo} alt="logo" /> </div>
                <div className="space"> <h3> Math Assistant</h3> </div>
            </div>
            <div className="space row"> <input className="input" onChange={handleName} type="text" placeholder="Name" /></div>
            <div className="space row"> <input className="input" onChange={handleChange} type="email" placeholder="Email" /></div>
            <div className="space row"> <input className="input" onChange={handlePassword} type="password" placeholder="Password" /> </div>
            <div> <p ref={node => componentRef.current = node} className="error_text hide space"> Credentials Not Valid </p> </div>
            <div> <button className="button" type="submit" onClick={onSubmit}> Sign Up </button>  </div>
        </div>
    )
}

export default SignupWidget;