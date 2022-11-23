import React from 'react';
import {useEffect, useState} from 'react';
import empty_picture from '../images/no_answer.webp';

// Importing styling
import '../App.css';
import './pages.css';

// Importing components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import QuestionNav from '../Components/Navbar/QuestionNav';
import ViewQuestionWidget from '../Widget/ViewQuestionWidget';
import AnswerWidget from '../Widget/AnswerWidget';

// Importing hooks
import QuestionAPI from '../hooks/QuestionAPI';
import AnswerAPI from '../hooks/AnswerAPI';

const ViewQuestion = () => {

    const [empty, setEmpty] = useState(false);
    const [getQuestion, setQuestion] = useState([]);
    const [answers, getAnswers] = useState([]);
    const id = localStorage.getItem('choosed_question');

    useEffect(() =>{
        const getQuestion = async () =>{
            const question = await QuestionAPI.getQuestionById(id);
            if (question.data.message === 'Found'){
                const get = question.data.data;
                setQuestion(get[0])
            } 
    }
        const getAnswersQuestion = async () => {
            const getAnswersPerQuestion = await AnswerAPI.getAnswersPerQuestion(id);
            console.log(getAnswersPerQuestion)
            if (getAnswersPerQuestion.data.message === 'Found'){
                const answer_array = getAnswersPerQuestion.data.data;
                
                getAnswers(answer_array)
            } else { setEmpty(true)}
    }; getQuestion(); getAnswersQuestion()}, []);

    return (
        <div>
            <Header></Header>
            <div className='page_content'>
                <div className='navbar'> <QuestionNav></QuestionNav></div>
                <div className='content'>
                <div> <h3 className='space'>Question</h3></div>
                    <ViewQuestionWidget key={getQuestion.id} name={getQuestion.name} id={getQuestion.id} name={getQuestion.name}  title={getQuestion.title} problem={getQuestion.problem} description={getQuestion.description} suggested_solution={getQuestion.suggested_solution}></ViewQuestionWidget>
                        <div className='page_break'> 
                            <h3> Answers </h3>
                        </div>
                        <div className='answers_container'>
                        {
                            empty && (<div className='center_empty'> <img src={empty_picture} alt='no answers' /> <h3> No Answers</h3> </div> )
                        }
                        { 
                            answers?.map((e) => {
                                return (<AnswerWidget id={e.id} name={e.name} description={e.description} accepted={e.accepted} ></AnswerWidget> )                            
                            }) 
                        }
                    </div> 
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};
    
export default ViewQuestion;