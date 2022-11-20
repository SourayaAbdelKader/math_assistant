import React from 'react';
import { useState, useEffect } from 'react';

// Importing style
import '../App.css';

// Importing components
import LowerFooter from '../Components/Footers/LowerFooter';
import UpperFooter from '../Components/Footers/UpperFooter';
import ProfileHeader from '../Components/Headers/ProfileHeader';
import SubHeader from '../Components/Headers/SubHeader';
import UserInfo from '../Components/Cards/UserInfo';
import ScoreCard from '../Components/Cards/ScoreCard';
import DataCard from '../Components/Cards/DataCard';
import FullMark from '../Components/Cards/FullMark';

// Importing images
import saved_questions from '../images/saved.png';
import questions_icon from '../images/questions_icon.png';
import practice_icon from '../images/practice_icon.png';
import tags_icon from '../images/tags_icon.png';

// Importing hooks
import userAPI from "../hooks/userAPI";
import scoreAPI from '../hooks/scoreAPI';
import QuestionAPI from '../hooks/questionsAPI';
import PracticeAPI from '../hooks/practiceAPI';

const Profile = () => {
    const [score, setScore] =useState(0);
    const [answerScore, setAnswerScore] =useState(0);
    const [practiceScore, setPracticeScore] =useState(0);
    const [fullmarked, setFullmarked] = useState(0);
    const [questions, setQuestions] = useState(0);
    const [saved, setSaved] = useState(0);
    const [tags, setTags] = useState(0);
    const [practice, setPractice] = useState(0);
    const [details, setDetails] =useState([]);

    useEffect(() =>{
        const getUserData  = async () =>{
                const user_score = await scoreAPI.getUSerScore(localStorage.getItem('user_id'));
                const user_answer_score = await scoreAPI.getUserAnswersScore(localStorage.getItem('user_id'));
                const user_practice_score = await scoreAPI.getUsePracticeScore(localStorage.getItem('user_id'));
                const user_fullmarked = await scoreAPI.getFullmarkedNumber(localStorage.getItem('user_id'));
                const user_data = await userAPI.getUserById(localStorage.getItem('user_id'));
                const get = user_data.data.data[0];
                const user_questions = await QuestionAPI.countQuestionPerUSer(localStorage.getItem('user_id'));
                const user_saved_questions = await QuestionAPI.countSavedQuestionPerUSer(localStorage.getItem('user_id'));
                const user_tags = await QuestionAPI.countTagsPerUSer(localStorage.getItem('user_id'));
                const user_practice = await PracticeAPI.countPracticePerUSer(localStorage.getItem('user_id'));
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
            <ProfileHeader></ProfileHeader>
            <SubHeader></SubHeader>
            <div className='Profile_container'> 
                <div> <h3> My Profile </h3> </div>
                <div> 
                    <UserInfo 
                        id={details.id}    
                        name={details.name} 
                        gender={details.gender}
                        location={details.location}
                        degree={details.degree}
                        birthdate={details.birthdate}
                        email={details.email}
                        phone={details.phone}
                    > 
                    </UserInfo> 
                </div>
                <div className='flex_inbetween'>
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
            <UpperFooter></UpperFooter>
            <LowerFooter></LowerFooter>

    </div>
    );
};
    
export default Profile;