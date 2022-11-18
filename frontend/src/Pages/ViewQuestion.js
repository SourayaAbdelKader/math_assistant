import React from 'react';
import {useEffect, useState} from 'react';

// Importing styling
import '../App.css';
import './pages.css';

// Importing components
import LowerFooter from '../Components/Footers/LowerFooter';
import UpperFooter from '../Components/Footers/UpperFooter';
import Header from '../Components/Headers/Headers';
import SubHeader from '../Components/Headers/SubHeader';
import QuestionsSidebar from '../Components/Sidebars/QuestionSidebar';
import ViewQuestionWidget from '../Widgets/ViewQuestionWidget';
import AnswerWidget from '../Widgets/AnswerWidget';

// Importing hooks
import QuestionAPI from '../hooks/questionsAPI';
import AnswerAPI from '../hooks/answersApi';

const ViewQuestion = () => {
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
            } 
    }; getQuestion(); getAnswersQuestion()}, []);

    return (
        <div>
            <Header></Header>
            <SubHeader> </SubHeader>
            <div className='flex'>
                <div className="tag_side_container">
                    <QuestionsSidebar></QuestionsSidebar>
                </div>
                <div className='question_page_container'>
                    <ViewQuestionWidget key={getQuestion.id} name={getQuestion.name} id={getQuestion.id} name={getQuestion.name}  title={getQuestion.title} problem={getQuestion.problem} description={getQuestion.description} suggested_solution={getQuestion.suggested_solution}></ViewQuestionWidget>
                    <div className='page_break'> 
                        <h3> Answers </h3>
                    </div>
                    <div className='answers_container'>
                    { 
                        answers?.map((e) => {
                            return (<AnswerWidget id={e.id} name={e.name} description={e.description} accepted={e.accepted} ></AnswerWidget> )                            
                        }) 
                    }
                    </div> 
                </div>
            </div>
            <UpperFooter></UpperFooter>
            <LowerFooter></LowerFooter>
        </div>
    );
};
    
export default ViewQuestion;