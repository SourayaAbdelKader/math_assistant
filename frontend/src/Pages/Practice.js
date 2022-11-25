import React from 'react';
import { useEffect, useState } from 'react';

// Importing style
import '../App.css';

// Importing Components
import LowerFooter from '../Components/Footers/LowerFooter';
import UpperFooter from '../Components/Footers/UpperFooter';
import Header from '../Components/Headers/Headers';
import PracticeSubHeader from '../Components/Headers/PracticeSubHeader';
import ProblemSidebar from '../Components/Sidebars/ProblemSidebar';
import ProblemCard from '../Components/Cards/ProblemCard';
import PracticeAPI from '../hooks/practiceAPI';

const Practice = () => {
    const [getPractice, setPractice] = useState([]);

    useEffect(() =>{
        const getPractice  = async () =>{
            const practice = await PracticeAPI.getPractices();
            if (practice.data.message === 'Found'){
                const get = practice.data.data;
                setPractice(get)
            } 
    }; getPractice();}, []);
    
    return (     
        <div>
            <Header></Header>
            <PracticeSubHeader></PracticeSubHeader>
            <div  className='flex'>
                <div className='tag_side_container'> <ProblemSidebar> </ProblemSidebar></div>
                <div className='tag_page_container'> 
                    <div className='tags_grid'>
                        {                  
                        getPractice?.map((e) => {
                            return (<ProblemCard id={e.id} name={e.name}></ProblemCard>)     
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
    
export default Practice;