import React from 'react';
import {useEffect, useState} from 'react';

// Importing styling
import '../App.css';
import './pages.css';

// Importing components
import LowerFooter from '../Components/Footers/LowerFooter';
import UpperFooter from '../Components/Footers/UpperFooter';
import Header from '../Components/Headers/Headers';
import QuestionSubHeader from '../Components/Headers/QuestionSubHeader';
import QuestionsSidebar from '../Components/Sidebars/QuestionSidebar';
import SearchButton from '../Components/Buttons/SearchButton';
import QuestionWidget from '../Widgets/QuestionWidget';

// Importing hooks
import QuestionAPI from '../hooks/questionsAPI';

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
            <QuestionSubHeader> </QuestionSubHeader>
            <div className='flex'>
                <div className="tag_side_container">
                    <QuestionsSidebar></QuestionsSidebar>
                </div>
                <div className='question_page_container'>
                    <div className='search_part'> 
                        <SearchButton></SearchButton>
                    </div>
                    <div className=''>
                    { 
                        getQuestionsData?.map((e) => {
                            return (<QuestionWidget key={e.id} id={e.id} user_id={e.user_id} picture_url={e.picture_url} name={e.name}  title={e.title} problem={e.problem} description={e.description} suggested_solution={e.suggested_solution}></QuestionWidget>)
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
    
export default Questions;