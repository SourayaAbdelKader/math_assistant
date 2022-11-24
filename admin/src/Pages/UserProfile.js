import React from 'react';
import { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing style
import '../App.css';

// Importing images
import saved_questions from '../images/saved.png';
import questions_icon from '../images/questions_icon.png';
import practice_icon from '../images/practice_icon.png';
import tags_icon from '../images/tags_icon.png';

// Importing components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import NullNav from '../Components/Navbar/NullNav';
import UserInfo from '../Components/Cards/UserInfo';
import DataCard from '../Components/Cards/DataCard';
import ScoreCard from '../Components/Cards/ScoreCard';
import FullMark from '../Components/Cards/FullMark';
import ViewUserCard from '../Components/Cards/ViewUserCard';

// Importing hooks
import UserAPI from "../hooks/UsersAPI";
import PracticeAPI from '../hooks/PracticeAPI';
import QuestionAPI from '../hooks/QuestionAPI';
import ScoreAPI from '../hooks/ScoreAPI';

const UserProfile = () => {

    const [details, setDetails] =useState([]);
    const [score, setScore] =useState(0);
    const [answerScore, setAnswerScore] =useState(0);
    const [practiceScore, setPracticeScore] =useState(0);
    const [fullmarked, setFullmarked] = useState(0);
    const [questions, setQuestions] = useState(0);
    const [saved, setSaved] = useState(0);
    const [tags, setTags] = useState(0);
    const [practice, setPractice] = useState(0);

    

    useEffect(() =>{
        const getUserData  = async () =>{
            const user_data = await UserAPI.getUserById(localStorage.getItem('choosed_user'));
            const get = user_data.data.data[0];
            setDetails(get);
            const user_score = await ScoreAPI.getUSerScore(localStorage.getItem('choosed_user'));
            const user_answer_score = await ScoreAPI.getUserAnswersScore(localStorage.getItem('choosed_user'));
            const user_practice_score = await ScoreAPI.getUsePracticeScore(localStorage.getItem('choosed_user'));
            const user_fullmarked = await ScoreAPI.getFullmarkedNumber(localStorage.getItem('choosed_user'));
            const user_questions = await QuestionAPI.countQuestionPerUSer(localStorage.getItem('choosed_user'));
            const user_saved_questions = await QuestionAPI.countSavedQuestionPerUSer(localStorage.getItem('choosed_user'));
            const user_tags = await QuestionAPI.countTagsPerUSer(localStorage.getItem('choosed_user'));
            const user_practice = await PracticeAPI.countPracticePerUSer(localStorage.getItem('choosed_user'));
            setDetails(get);
            if (user_score.data.data == 'null') { 
                setScore('0');
            } else {setScore(user_score.data.data);}
            setAnswerScore(user_answer_score.data.data);
            setPracticeScore(user_practice_score.data.data);
            setFullmarked(user_fullmarked.data.data);
            setQuestions(user_questions.data.data);
            setSaved(user_saved_questions.data.data);
            let count = 0;
            let ids = []
            for (let i=0; i<user_tags.data.data.length; i++) {
                if (!ids.includes(user_tags.data.data[i].tag_id)){
                    count += 1;
                    ids.push(user_tags.data.data[i].tag_id)
                }
            }
            setTags(count);
            setPractice(user_practice.data.data)
    }; getUserData();}, []); 

    return (
        <div>
            <Header></Header>
            <div className='page_content'> 
                <NullNav></NullNav>
                <div className='content'>
                <div> <h3 className='space'> Profile </h3> </div>
                <div className='Profile_container'> 
                    <ViewUserCard 
                        id={details.id}    
                        name={details.name} 
                        gender={details.gender}
                        location={details.location}
                        degree={details.degree}
                        birthdate={details.birthdate}
                        email={details.email}
                        phone={details.phone}
                        picture_url={details.picture_url}
                    > 
                    </ViewUserCard> 
                <div className='flex_row flex_inbetween'>
                    <ScoreCard  total={answerScore+practiceScore} answers={answerScore} practice={practiceScore}></ScoreCard>
                    <FullMark  total={fullmarked}></FullMark>
                </div>
                <div className='flex_row flex_inbetween borders'>
                    <DataCard pic={saved_questions} number={saved} type={'Saved Questions'}></DataCard>
                    <DataCard pic={practice_icon} number={practice} type={'Practice'}></DataCard>
                    <DataCard pic={questions_icon} number={questions} type={'Questions'}></DataCard>
                    <DataCard pic={tags_icon} number={tags} type={'Tags Used'}></DataCard>
                </div>
                </div>
                </div>
            </div>
        <LowerFooter></LowerFooter>
        </div>
    );
};
    
export default UserProfile;