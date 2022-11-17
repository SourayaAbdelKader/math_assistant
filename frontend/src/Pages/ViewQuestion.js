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
import QuestionWidget from '../Widgets/QuestionWidget';

// Importing hooks
import QuestionAPI from '../hooks/questionsAPI';

const ViewQuestion = () => {
    const [getQuestion, setQuestion] = useState([]);
    const id = localStorage.getItem('choosed_question');
    useEffect(() =>{
        const getQuestion = async () =>{
            const question = await QuestionAPI.getQuestionById(id);
            if (question.data.message === 'Found'){
                const get = question.data.data;
                setQuestion(get[0])
            } 
    }; getQuestion();}, []);
    return (
        <div>
            <Header></Header>
            <SubHeader> </SubHeader>
            <div className='flex'>
                <div className="tag_side_container">
                    <QuestionsSidebar></QuestionsSidebar>
                </div>
                <div className='question_page_container'>
                <QuestionWidget key={getQuestion.id} id={getQuestion.id} name={getQuestion.name}  title={getQuestion.title} problem={getQuestion.problem} description={getQuestion.description} suggested_solution={getQuestion.suggested_solution}></QuestionWidget>
                </div>
            </div>
            <UpperFooter></UpperFooter>
            <LowerFooter></LowerFooter>
        </div>
    );
};
    
export default ViewQuestion;