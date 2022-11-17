import React from 'react';
import { useEffect, useState } from 'react';

// Importing style
import '../App.css';

// Importing Components
import LowerFooter from '../Components/Footers/LowerFooter';
import UpperFooter from '../Components/Footers/UpperFooter';
import Header from '../Components/Headers/Headers';
import SubHeader from '../Components/Headers/SubHeader';
import PracticeAPI from '../hooks/practiceAPI';
import SolvedProblemsSidebar from '../Components/Sidebars/SolvedProblemsSidebar';
import CheckedProblem from '../Components/Cards/CheckedProblem' ;
import UnCheckedProblem from '../Components/Cards/UnCheckedProblem';
import noProblemsFound from '../images/problems_empty_state.png';

const ViewSolve = () => {

    const [getChecked, setChecked] = useState([]);
    const [getUnchecked, setUnchecked] = useState([]);
    const[empty, setEmpty] = useState([]);

    useEffect(() =>{
        const getPractice  = async () =>{
            const checked = await PracticeAPI.getCheckedProblems(localStorage.getItem("user_id"));
            const unchecked = await PracticeAPI.getUncheckedProblems(localStorage.getItem("user_id"));
            if (checked.data.message === 'Found'){
                const get = checked.data.data;
                setChecked(get)}
            if (unchecked.data.message === 'Found'){
                const getUnchecked = unchecked.data.data;
                setUnchecked(getUnchecked);} 
            if (unchecked.data.message !== 'Found' && checked.data.message !== 'Found'){
                setEmpty(["empty"])}
            if (getUnchecked.length == 0  && getChecked.length == 0){
                setEmpty(["empty"])}
    }; getPractice();}, []);

    const onSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('choosed_solved_problem', e.target.id);
    }
    
    return (     
        <div>
            <Header></Header>
            <SubHeader></SubHeader>
            <div  className='flex'>
                <div className='tag_side_container'> <SolvedProblemsSidebar></SolvedProblemsSidebar> </div>
                <div className='tag_page_container'> 
                    <div className='tags_grid'>
                    {                  
                        getChecked?.map((e) => {
                            return (<CheckedProblem onClick={onSubmit} id={e.id} name={e.name}></CheckedProblem>)
                        }) 
                    }
                    {                  
                        getUnchecked?.map((e) => {
                            return (<UnCheckedProblem key={e.id}  id={e.id} name={e.name}></UnCheckedProblem>)
                        }) 
                    }
                    {
                        empty?.map((e) => {
                            return (<div className='empty_state'> <img src={noProblemsFound} alt="empty_state"/> </div>)
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
    
export default ViewSolve;