import React from 'react';
import './pages.css'

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import LoginHeader from '../Components/Headers/LoginHeader';

const Dashboard = () => {

    return (
        <div>
            <LoginHeader></LoginHeader>
                <section>
                   <div className='hero'> 
                        <h3 className="white_text space"> Math Assistant</h3>
                        <p className='white_text'> Description right here </p>
                    </div>
                </section>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Dashboard;