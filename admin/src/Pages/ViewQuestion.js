import React from 'react';
import {useEffect, useState} from 'react';

// Importing styling and assets
import '../App.css';
import './pages.css';
import empty_picture from '../images/no_answer.webp';

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
        // Getting the question data
        const getQuestion = async () =>{
            const question = await QuestionAPI.getQuestionById(id);
            if (question.data.message === 'Found'){
                const get = question.data.data;
                setQuestion(get[0])
            } 
        }

        // Getting the answers for this question
        const getAnswersQuestion = async () => {
            const getAnswersPerQuestion = await AnswerAPI.getAnswersPerQuestion(id);
            if (getAnswersPerQuestion.data.message === 'Found'){
                const answer_array = getAnswersPerQuestion.data.data;
                
                getAnswers(answer_array)
            } else { setEmpty(true)}
    }; getQuestion(); getAnswersQuestion()}, []);

    return (
        <div>
            <Header></Header>
            <div className='page_content'>
                <div className='navbar'><QuestionNav></QuestionNav></div>
                <div className='content'>
                <div> <h3 className='space'>Question</h3></div>
                    <ViewQuestionWidget key={getQuestion.id} picture_url={getQuestion.picture_url} name={getQuestion.name} id={getQuestion.id} name={getQuestion.name} user_id={getQuestion.user_id}  title={getQuestion.title} problem={getQuestion.problem} description={getQuestion.description} suggested_solution={getQuestion.suggested_solution}></ViewQuestionWidget>
                        <div className='page_break'> 
                            <h3> Answers </h3>
                        </div>
                        <div className='answers_container'>
                        {
                            empty && (<div className='center_empty'> <img src={empty_picture} alt='no answers' /> <h3> No Answers</h3> </div> )
                        }
                        { 
                            answers?.map((e) => {
                                return (<AnswerWidget id={e.id} user_id={e.user_id} picture_url={e.picture_url} name={e.name} description={e.description} accepted={e.accepted} ></AnswerWidget> )                            
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