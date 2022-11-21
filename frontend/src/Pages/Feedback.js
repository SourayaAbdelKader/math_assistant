import React from 'react';
import { useEffect, useState } from 'react';

// Importing style and assets
import '../App.css';
import empty from '../images/feedback_empty_state.png';

// Importing Components
import Header from '../Components/Headers/Headers';
import QuestionForEx from '../Components/Cards/QuestionForEx';

import PracticeAPI from '../hooks/practiceAPI';

const Feedback = () => {
    const id = localStorage.getItem('selected_practice');

    const [practice, setPractice] = useState([]);
    const [checked, setChecked] = useState(false);
    const [userSolution, setuserSolution] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() =>{
        const getPractice  = async () =>{
            const exercice = await PracticeAPI.getPracticeById(id);
            if (exercice.data.message === 'Found'){
                const get = exercice.data.data[0];
                console.log(get)
                setPractice(get)
            } 
            const solutions = await PracticeAPI.getSolutions(id);
            if (solutions.data.message === 'Found'){
                for( let i=0; i < solutions.data.data.length; i++){
                    console.log(solutions.data.data[i])
                    if (solutions.data.data[i].problem_id == id && solutions.data.data[i].user_id == localStorage.getItem('user_id')){
                        setuserSolution(solutions.data.data[i])
                    }
                }
            } if (userSolution.checked == 1){setChecked(true)}
    }; getPractice();}, []);


    return (     
        <div>
            <Header></Header>
            <div className='flex'>
                <QuestionForEx id={practice.id} name={practice.name} description={practice.description} picture_url={practice.picture_url} level={practice.level} button={true} points={practice.points}></QuestionForEx>
                <div className='practice_section'>
                    <div> <h3 className=''> The Answer </h3> </div>
                    <div className='answer space'> <p>{userSolution.description}</p> </div>
                    <div> <h3 className=''> Feedback </h3> </div>
                    {
                        checked && ( <div>
                            <div className='answer space'> <p>{userSolution.feedback}</p> </div>                    
                            <div> <h3> Points </h3> </div>
                            <div className='answer space'> <p>{userSolution.score}</p> </div>
                        </div>
                        )
                    }
                    {
                        !checked && ( <div>                  
                            <div className='feedback_empty'> <img src={empty} alt='empty'/> </div>
                        </div>
                        )
                    }
                                      
                </div>
            </div>
        </div>
    );
};
    
export default Feedback;