import React from 'react';
import { useEffect, useState } from 'react';

// Importing style and assets
import '../App.css';
import submit from '../images/submit.png';

// Importing Components
import Header from '../Components/Headers/Headers';
import QuestionForEx from '../Components/Cards/QuestionForEx';

import PracticeAPI from '../hooks/practiceAPI';

const Exercice = () => {
    const [getPractice, setPractice] = useState([]);

    useEffect(() =>{
        const getPractice  = async () =>{
            const practice = await PracticeAPI.getPractices();
            console.log(practice)
            if (practice.data.message === 'Found'){
                const get = practice.data.data;
                console.log(get)
                setPractice(get)
            } 
    }; getPractice();}, []);

    const handleClick = (e) => {localStorage.setItem("selected_practice", e.target.id);}
    
    return (     
        <div>
            <Header></Header>
            <div className='flex'>
                <QuestionForEx></QuestionForEx>
                <div className='practice_section'>
                    <div> <h3> Your Answer </h3> </div>
                    <div> <textarea className='excercise_textarea' placeholder='Type your answer here...'></textarea></div>
                    <div> <button className='solve flex_bottom'> <img className="small_icon" src={submit} alt='submit' /> Submit </button></div>
                </div>
            </div>
        </div>
    );
};
    
export default Exercice;