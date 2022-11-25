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
    const [checkedSolution, setChecked] = useState();
    const [userSolution, setuserSolution] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const getPractice  = async () =>{
            const exercice = await PracticeAPI.getPracticeById(id);
            if (exercice.data.message === 'Found'){
                const get = exercice.data.data[0];
                setPractice(get)
            } 
            setLoading(true);
            const solutions = await PracticeAPI.getSolutionforUser({
                'user_id': localStorage.getItem('user_id'),
                'problem_id': id
            });;
            if (solutions.data.message === 'Found'){
                setuserSolution(solutions.data.data[0]);
            if (solutions.data.data[0].checked == 1){setChecked(true); 
            } else if(solutions.data.data[0].checked == 0) {setLoading(false)}
            setLoading(false)
    }}; getPractice();}, []);


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
                        !loading && checkedSolution && ( <div>
                            <div className='answer space'> <p>{userSolution.feedback}</p> </div>                    
                            <div> <h3> Points </h3> </div>
                            <div className='answer space'> <p>{userSolution.score}</p> </div>
                        </div>
                        )
                    }
                    {
                        ! loading && !checkedSolution && ( <div>                  
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