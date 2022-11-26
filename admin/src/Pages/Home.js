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
                        <h1 className=" space"> Math Assistant</h1>
                        <h3 className='center_text bold'> Share your problem by scanning it. Help other by ansswering their questions, and voting for suitable solutions. You can also enhance your math knowledge by practicing and getting feedback. </h3>
                    </div>
                </section>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Home;