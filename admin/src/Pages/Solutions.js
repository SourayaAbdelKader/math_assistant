import React from 'react';
import {useState, useEffect} from 'react';
import './pages.css';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import PracticeNav from '../Components/Navbar/PracticeNav';
import SolutionAPI from '../hooks/SolutionAPI';
import SolutionWidget from '../Widget/SolutionWidget';

const Solutions = () => {

    const [solutions, setSolutions] = useState([]);
    const [checked, setChecked] = useState([]);
    useEffect(() =>{
        const getQuestion = async () =>{
            const questions = await SolutionAPI.getUncheckedProblems();
            if (questions.data.message === 'Found'){
                const get = questions.data.data;
                setSolutions(get)
            }
        const checked_solutions = await SolutionAPI.getCheckedProblems();
            if (checked_solutions.data.message === 'Found'){
                const get = checked_solutions.data.data;
                setChecked(get)
            }  
    }; getQuestion();}, []);

    const onClick = (e) => {
        e.preventDefault();
        console.log(e.target.id)
    }

    return (
        <div>
            <div className='header'>
            <Header></Header>
            </div>
            <div className='page_content'>
                <div className='navbar'> <PracticeNav></PracticeNav></div>
                <div className='content'>
                    <div> <h3 className='space'>Solutions</h3></div>
                    <div className='flex_between row_table'> 
                        <div className='column bold'> Solution Number </div>
                        <div className='column bold'> Status </div>
                    </div>
                    { 
                        solutions?.map((e) => {
                            if (localStorage.getItem('choosed_practice') == e.problem_id){
                                return(
                                    <SolutionWidget id={e.id} status={'Unchecked'}></SolutionWidget>
                                )
                            }
                        })
                    }
                    {    
                        checked?.map((e) => {
                            if (localStorage.getItem('choosed_practice') == e.problem_id){
                                return(
                                    <SolutionWidget id={e.id} status={'Checked'}></SolutionWidget>
                                )
                            }
                        })  
                    }

                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Solutions;