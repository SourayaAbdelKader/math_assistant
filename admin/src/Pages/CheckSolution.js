import React from 'react';
import {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';

// Importing styling
import './pages.css';
import 'reactjs-popup/dist/index.css';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import QuestionForEx from '../Components/Cards/QuestionForEx';
import PracticeAPI from '../hooks/PracticeAPI';
import submit from '../images/submit.png';
import SolutionAPI from '../hooks/SolutionAPI';

const CheckSolution = () => {

    const componentRef = React.useRef();

    const id = localStorage.getItem('choosed_solution');
    const [open, setOpen] = useState(false);
    const [practice, setPractice] = useState([]);
    const [userSolution, setUserSolution] = useState('')
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState();
    const [message, setMessage] = useState('')

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
            const exercice = await PracticeAPI.getPracticeById(localStorage.getItem('choosed_practice'));
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
        addFeedback(id, description, points, localStorage.getItem('user_id'));
        console.log(points)
    }

    const addFeedback = async ( solution_id, feedback, score, editor_id) => {
        const add_solution = await PracticeAPI.addFeedback({
            "feedback":feedback,
            "solution_id":solution_id,
            "score": score,
            "editor_id": editor_id
        });
        if (add_solution.data.message == 'Solution Already Checked'){
            setMessage('Solution Already Checked')
        } else if (add_solution.data.message == 'Added Successfully'){
            const sendNotification = await PracticeAPI.sendNotification({
                'user_id': userSolution.user_id,
                'title': 'New Notification',
                'body': 'You received a feedback on your solution./'+userSolution.id +'/'+practice.id,
                'info': 0,
            })
            setMessage('Added Successfully')
        } else {
            setMessage('There is an error submitting your feedback...')
        }
        setOpen(true)
        console.log(add_solution.data.message)
    }

    return (
        <div>
            <div className='header'>
            <Header></Header>
            </div>
            <div className='flex exercice_container'>
                <QuestionForEx id={practice.id} name={practice.name} description={practice.description} picture_url={practice.picture_url} level={practice.level} points={practice.points}></QuestionForEx>
                <div className='practice_section'>
                    <div> <h3 className=''> The Answer </h3> </div>
                    <div className='answer space'> <p>{userSolution.description} </p> </div>
                    <div> <h3 className=''> Feedback </h3> </div>
                    <div className='space'> <textarea onChange={handleChange} className='textarea' placeholder='Type your feedback here...'></textarea></div>
                    <div> <h3> Points </h3> </div>
                    <div> <textarea onChange={handlePoints} className='points_textarea' placeholder='Points...'></textarea></div>
                    <div> <p ref={node => componentRef.current = node} className="error_text hide space"> Invalid Inputs </p> </div>
                    <div> <button onClick={submitAnswer} className='solve pointer flex_bottom'> <img className="small_icon" src={submit} alt='submit' /> Submit </button></div>
                </div>
                <Popup open={open} modal nested >
                    {close => (
                        <div className="modal flex">
                            <button className="close space_right" onClick={close}>
                                &times;
                            </button>
                            <div className='flex'> <h3> {message} </h3></div>
                        </div>
                    )}
                </Popup>
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default CheckSolution;