import React from 'react';
import { useEffect, useState } from 'react';

// Importing style and assets
import '../App.css';
import submit from '../images/submit.png';
import back from '../images/back.png';

// Importing Components
import LowerFooter from '../Components/Footers/LowerFooter';
import UpperFooter from '../Components/Footers/UpperFooter';
import Header from '../Components/Headers/Headers';
import PracticeSubHeader from '../Components/Headers/PracticeSubHeader';
import ProblemSidebar from '../Components/Sidebars/ProblemSidebar';
import ProblemCard from '../Components/Cards/ProblemCard';
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
                <div className='question_section'>
                    <div className='flex space'> 
                       <img className='medium_icon cursor' src={back} alt="back" />
                       <h3 className='white_text space_left'> Question </h3>
                    </div>
                    <div className='bold white_text space'> Title</div>
                    <div className='white_text space'> description </div>
                    <div> <img src="" alt="" /> </div>
                </div>
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