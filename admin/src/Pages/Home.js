import React from 'react';
import './pages.css'

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import LoginHeader from '../Components/Headers/LoginHeader';

const Home = () => {

    return (
        <div>
            <LoginHeader></LoginHeader>
                <section>
                   <div className='hero'> 
                        <h3 className=" space"> Math Assistant</h3>
                        <p> Description right here </p>
                    </div>
                </section>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Home;