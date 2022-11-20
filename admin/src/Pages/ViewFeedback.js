import React from 'react';
import {useState, useEffect} from 'react';
import './pages.css';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import QuestionForEx from '../Components/Cards/QuestionForEx';
import PracticeAPI from '../hooks/PracticeAPI';
import submit from '../images/submit.png';
import SolutionAPI from '../hooks/SolutionAPI';

const ViewFeedback = () => {

    const componentRef = React.useRef();

    const id = localStorage.getItem('choosed_practice');

    const [practice, setPractice] = useState([]);
    const [userSolution, setUserSolution] = useState('')
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState();

    function handlePoints(event){
        let number = event.target.value;
        if(number.length > 0 && number.length <3 && !isNaN(number) && number <= practice.points){
            setPoints(number)
        } else if (!number || number.length == 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        } else {
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        }
    }

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
            const solution = await SolutionAPI.getAnswerById(localStorage.getItem('choosed_solution'));
            console.log(solution)
            if (solution.data.message === 'Found'){
                const get = solution.data.data
                console.log(get)
                setUserSolution(get)
            } 
    }; getPractice();}, []);

    const submitAnswer = (e) => {
        e.preventDefault();
        addFeedback(description, id, localStorage.getItem('user_id'));
    }

    const addFeedback = async (editor_id, solution_id, description, points) => {
        const add_solution = await PracticeAPI.addSolution({
            "description":description,
            "user_id":'',
            "problem_id": ''
        });
        console.log(add_solution)
    }

    return (
        <div>
            <div className='header'>
            <Header></Header>
            </div>
            <div className='flex'>
                <QuestionForEx id={practice.id} name={practice.name} description={practice.description} picture_url={practice.picture_url} level={practice.level} points={practice.points}></QuestionForEx>
                <div className='practice_section'>
                    <div> <h3 className=''> The Answer </h3> </div>
                    <div className='answer space'> <p>{userSolution.description}</p> </div>
                    <div> <h3 className=''> Feedback </h3> </div>
                    <div className='answer space'> <p>{userSolution.feedback}</p> </div>                    
                    <div> <h3> Points </h3> </div>
                    <div className='answer space'> <p>{userSolution.score}</p> </div>                    <div> <p ref={node => componentRef.current = node} className="error_text hide space"> Invalid Inputs </p> </div>
                </div>
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default ViewFeedback;