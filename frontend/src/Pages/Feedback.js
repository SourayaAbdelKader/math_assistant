import React from 'react';
import { useEffect, useState } from 'react';

// Importing style and assets
import '../App.css';

// Importing Components
import Header from '../Components/Headers/Headers';
import QuestionForEx from '../Components/Cards/QuestionForEx';

import PracticeAPI from '../hooks/practiceAPI';

const Feedback = () => {
    const id = localStorage.getItem('selected_practice');

    const [practice, setPractice] = useState([]);
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() =>{
        const getPractice  = async () =>{
            const exercice = await PracticeAPI.getPracticeById(id);
            if (exercice.data.message === 'Found'){
                const get = exercice.data.data[0];
                console.log(get)
                setPractice(get)
            } 
    }; getPractice();}, []);


    return (     
        <div>
            <Header></Header>
            <div className='flex'>
                <QuestionForEx id={practice.id} name={practice.name} description={practice.description} picture_url={practice.picture_url} level={practice.level} points={practice.points}></QuestionForEx>
                <div className='practice_section'>
                    <div> <h3> Your Answer </h3> </div>
                </div>
            </div>
        </div>
    );
};
    
export default Feedback;