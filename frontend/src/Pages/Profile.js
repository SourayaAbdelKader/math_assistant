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

// Importing images
import saved_questions from '../images/saved.png';
import questions_icon from '../images/questions_icon.png';
import practice_icon from '../images/practice_icon.png';
import tags_icon from '../images/tags_icon.png';

// Importing hooks
import userAPI from "../hooks/userAPI";
import scoreAPI from '../hooks/scoreAPI';

const Profile = () => {
    const [score, setScore] =useState(0);
    const [answerScore, setAnswerScore] =useState(0);
    const [practiceScore, setPracticeScore] =useState(0);
    const [fullmarked, setFullmarked] = useState(0);
    const [details, setDetails] =useState([]);

    useEffect(() =>{
        const getUserData  = async () =>{
                console.log(localStorage.getItem('user_id'))
                const user_score = await scoreAPI.getUSerScore(localStorage.getItem('user_id'));
                const user_answer_score = await scoreAPI.getUserAnswersScore(localStorage.getItem('user_id'));
                const user_practice_score = await scoreAPI.getUsePracticeScore(localStorage.getItem('user_id'));
                const user_fullmarked = await scoreAPI.getFullmarkedNumber(localStorage.getItem('user_id'));
                const user_data = await userAPI.getUserById(localStorage.getItem('user_id'));
                const get = user_data.data.data[0];
                
                setDetails(get)
                setScore(user_score.data.data);
                setAnswerScore(user_answer_score.data.data);
                setPracticeScore(user_practice_score.data.data)
                setFullmarked(user_fullmarked.data.data);
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
                <div>
                    <div className='flex_inbetween'>
                        <ScoreCard total={score} answers={answerScore} practice={practiceScore}></ScoreCard>
                        <ScoreCard></ScoreCard>
                    </div>  
                    <div>
                        <div> Fulled Marked Practice </div>
                        <div> {fullmarked} </div>
                    </div>  
                </div>
                <div className='flex_row flex_inbetween borders'>
                    <DataCard pic={saved_questions} number={''} type={'Saved Questions'}></DataCard>
                    <DataCard pic={practice_icon} number={''} type={'Practice'}></DataCard>
                    <DataCard pic={questions_icon} number={''} type={'Questions'}></DataCard>
                    <DataCard pic={tags_icon} number={''} type={'Tags Used'}></DataCard>
                </div>
            </div>
            <UpperFooter></UpperFooter>
            <LowerFooter></LowerFooter>

    </div>
    );
};
    
export default Profile;