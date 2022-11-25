import React from 'react';
import  {useState, useEffect} from 'react';
import HomeAPI from '../hooks/homeApi';

// ________________ Home ________________
// It contains the important information of this website, it's parts and it's rule.
// All the important details are displayed on this page.

// Importing Components
import LowerFooter from '../Components/Footers/LowerFooter';
import LoginHeader from '../Components/Headers/LoginHeader';
import HomeFooter from '../Components/Footers/HomeFooter';
import DataCard from '../Components/Cards/DataCard';

// Importing images
import main from '../images/main.png';
import logo from '../images/logo.png';
import left_chat from '../images/chat_left.png';
import right_chat from '../images/chat_right.png';
import questions_pic from '../images/questions.png';
import users_pic from '../images/users.png';
import answers_pic from '../images/answers_numb.png';
import editors_pic from '../images/editors.png';
import box1 from '../images/box1.png';
import box2 from '../images/box2.png';
import box3 from '../images/box3.png';

const Home = () => {
        // Getting the data for the home page
        const [users, setUsers] = useState();
        const [questions, setQuestions] = useState();
        const [editors, setEditors] = useState();
        const [problems, setProblems] = useState();

        useEffect(() =>{
                const getData  = async () =>{
                        const user_data = await HomeAPI.getUsersNumber();
                        const editor_data = await HomeAPI.getEditorsNumber();
                        const question_data = await HomeAPI.getQuestionsNumber();
                        const problem_data = await HomeAPI.getProblemsNumber();
                        setUsers(user_data.data.data);
                        setEditors(editor_data.data.data);
                        setQuestions(question_data.data.data);
                        setProblems(problem_data.data.data);
        }; getData();}, []); 

        return (
                <div>
                        <LoginHeader></LoginHeader>
                        <section>
                                <div className='hero'> 
                                     <h1 className="white_text space"> Math Assistant </h1>
                                     <h3 className='white_text center_text bold'> Share your problem by scanning it. Help others by answering their questions, and voting for suitable solutions. You can also enhance your math knowledge by practicing and getting feedback. </h3>
                                </div>
                        </section>
                        <section>
                                <div className='flex_row home_container'>
                                        <div> <img className='main' src={main} alt="main"/> </div>
                                        <div>
                                                <div> <h3> Why Math Assistant? </h3></div>
                                                <div className='paragraph'> It's your place to get to share your problems by simply entering it or scanning it for images. The others will help by answering your question. You can accept and vote answers for a better experience. Moreover, check our practice part, where you can solve math problems and get feedback from our editors to enhance your score. </div>
                                        </div>
                                </div>
                        </section>
                        <section> 
                                <div className='home_container'>
                                        <div className='flex_row flex_inbetween space'> 
                                                <div> <img className='chat' src={left_chat} alt="pic"/> </div>
                                                <div> <img className='chat' src={right_chat} alt="pic"/> </div>
                                        </div>
                                        <div className='center'> <img className='home_logo' src={logo} alt='logo'/> </div>
                                </div>
                        </section>
                        <section>
                                <div className='home_container data flex_row flex_inbetween'>
                                        <DataCard pic={questions_pic} number={questions}  type={'Asked questions'}></DataCard>
                                        <DataCard pic={users_pic} number={users}  type={'Users'}></DataCard>
                                        <DataCard pic={answers_pic} number={problems}  type={'Problems'}></DataCard>
                                        <DataCard pic={editors_pic} number={editors}  type={'Editors'}></DataCard>
                                </div>
                        </section>
                        <section>
                                <div className='home_container'>
                                        <div className='center space'> <h1> Scoring System </h1> </div>
                                        <div className='flex_row flex_inbetween space'> 
                                                <div className='description_box'> 
                                                        <div> <img className='description_image' src={box1} alt="shape"/> </div>
                                                </div>
                                                <div className='description_box'>
                                                        <div> <img className='description_image' src={box2} alt="shape"/> </div>
                                                </div>
                                        </div>
                                        <div className='description_box'> 
                                                <div> <img className='long_description_image' src={box3} alt="shape"/> </div>
                                        </div>
                                </div>
                        </section>
                        <HomeFooter></HomeFooter>
                        <LowerFooter></LowerFooter>
                </div>
        );
};

export default Home;