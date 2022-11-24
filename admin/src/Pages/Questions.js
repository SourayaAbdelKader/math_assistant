import React from 'react';
import './pages.css';
import { useState, useEffect } from 'react';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import QuestionNav from '../Components/Navbar/QuestionNav';
import QuestionWidget from '../Widget/QuestionWidget';
import QuestionAPI from '../hooks/QuestionAPI';

const Questions = () => {

    const [getQuestionsData, setQuestions] = useState([]);

    useEffect(() =>{
        const getQuestion = async () =>{
            const questions = await QuestionAPI.getQuestions();
            if (questions.data.message === 'Found'){
                const get = questions.data.data;
                setQuestions(get)
            } 
    }; getQuestion();}, []);

    return (
        <div>
            <Header></Header>
            <div className='page_content'>
                <div className='navbar'> <QuestionNav></QuestionNav></div>
                <div className='content'>
                <div> <h3 className='space'>Questions</h3></div>
                <div className='question_page_container'>
                    <div className=''>
                    { 
                        getQuestionsData?.map((e) => {
                            return (<QuestionWidget key={e.id} user_id={e.user_id} id={e.id} name={e.name} picture_url={e.picture_url}  title={e.title} problem={e.problem} description={e.description} suggested_solution={e.suggested_solution}></QuestionWidget>)
                        }) 
                    }
                    </div>
                </div>
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Questions;