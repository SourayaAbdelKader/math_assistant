import React from 'react';

import './pages.css';
import LowerFooter from '../Components/LowerFooter';
import LoginWedget from '../Widget/LoginWidget';

const Login = () => {
    return (
        <div className='login_page'>
            <div> <LoginWedget></LoginWedget> </div>
            <div className='lower'> <LowerFooter></LowerFooter></div>
        </div>
    );
};

export default Login;