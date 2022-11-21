import React from 'react';

import './pages.css';
import LowerFooter from '../Components/Footers/LowerFooter';
import SignupWidget from '../Widgets/SignupWidget';

const Signup = () => {
    return (
        <div className='login_page'>
            <div> <SignupWidget></SignupWidget> </div>
            <div className='lower'> <LowerFooter></LowerFooter> </div>
        </div>
    );
};

export default Signup;