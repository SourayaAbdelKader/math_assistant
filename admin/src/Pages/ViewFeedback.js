import React from 'react';
import {useState, useEffect} from 'react';

// Importing styling
import './pages.css';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import QuestionForEx from '../Components/Cards/QuestionForEx';

// Importing hooks
import PracticeAPI from '../hooks/PracticeAPI';
import SolutionAPI from '../hooks/SolutionAPI';

const ViewFeedback = () => {

    const id = localStorage.getItem('choosed_practice');

    const [practice, setPractice] = useState([]);
    const [userSolution, setUserSolution] = useState('')

    useEffect(() =>{
        const getPractice  = async () =>{
            const exercice = await PracticeAPI.getPracticeById(id);
            if (exercice.data.message === 'Found'){
                const get = exercice.data.data[0];
                setPractice(get)
            } 
            const solution = await SolutionAPI.getAnswerById(localStorage.getItem('choosed_solution'));
            if (solution.data.message === 'Found'){
                const get = solution.data.data
                setUserSolution(get)
            } 
    }; getPractice();}, []);

    return (
        <div>
            <div className='header'>
            <Header></Header>
            </div>
            <div className='flex exercice_container'>
                <QuestionForEx id={practice.id} name={practice.name} description={practice.description} picture_url={practice.picture_url} level={practice.level} points={practice.points}></QuestionForEx>
                <div className='practice_section'>
                    <div> <h3 className=''> The Answer </h3> </div>
                    <div className='answer space'> <p>{userSolution.description}</p> </div>
                    <div> <h3 className=''> Feedback </h3> </div>
                    <div className='answer space'> <p>{userSolution.feedback}</p> </div>                    
                    <div> <h3> Points </h3> </div>
                    <div className='answer space'> <p>{userSolution.score}</p> </div>                    
                </div>
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default ViewFeedback;