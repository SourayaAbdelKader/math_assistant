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

    const componentRef = React.useRef();

    const id = localStorage.getItem('selected_practice');

    const [practice, setPractice] = useState([]);

    const [description, setDescription] = useState("");

    function handleChange(event){
        console.log(event.target.value);
        let description = event.target.value;
        if(description.length < 30){ 
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        } else { 
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');         
        }
        if (description.length == 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        setDescription(description);
    };

    useEffect(() =>{
        const getPractice  = async () =>{
            const exercice = await PracticeAPI.getPracticeById(id);
            console.log(exercice)
            if (exercice.data.message === 'Found'){
                const get = exercice.data.data[0];
                console.log(get)
                setPractice(get)
            } 
    }; getPractice();}, []);

    const submitAnswer = (e) => {
        e.preventDefault();
        addSolution(description, id, localStorage.getItem('user_id'));
    }

    const addSolution = async (description,  problem_id, user_id) => {
        const add_solution = await PracticeAPI.addSolution({
            "description":description,
            "user_id":user_id,
            "problem_id": problem_id
        });
        console.log(add_solution)
    }

    return (     
        <div>
            <Header></Header>
            <div className='flex'>
                <QuestionForEx id={practice.id} name={practice.name} description={practice.description} picture_url={practice.picture_url} level={practice.level} points={practice.points}></QuestionForEx>
                <div className='practice_section'>
                    <div> <h3> Your Answer </h3> </div>
                    <div> <textarea onChange={handleChange} className='excercise_textarea' placeholder='Type your answer here...'></textarea></div>
                    <div> <p ref={node => componentRef.current = node} className="error_text hide space"> The solution must be a minimum of 30 character. </p> </div>
                    <div> <button onClick={submitAnswer} className='solve flex_bottom'> <img className="small_icon" src={submit} alt='submit' /> Submit </button></div>
                </div>
            </div>
        </div>
    );
};
    
export default Exercice;