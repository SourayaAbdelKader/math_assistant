import React from 'react';
import  {useState, useEffect} from 'react';
import HomeAPI from '../hooks/homeApi';

// Importing Components
import LowerFooter from '../Components/Footers/LowerFooter';
import LoginHeader from '../Components/Headers/LoginHeader';
import HomeFooter from '../Components/Footers/HomeFooter';

// Importing images
import main from '../images/main.png';
import logo from '../images/logo.png';
import left_chat from '../images/chat-left.png';
import right_chat from '../images/chat-right.png';
import questions_pic from '../images/questions.png';
import users_pic from '../images/users.png';
import answers_pic from '../images/answers_numb.png';
import editors_pic from '../images/editors.png';
import description_short_box from '../images/description_short_box.png';
import description_long_box from '../images/description_long_box.png';

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
                                        <h3 className="white_text space"> Math Assistant</h3>
                                        <p className='white_text'> Description right here </p>
                                </div>
                        </section>
                        <section>
                                <div className='flex_row home_container'>
                                        <div> <img className='main' src={main} alt="main"/> </div>
                                        <div>
                                                <div> Title </div>
                                                <div> Description </div>
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
                                        <div className='data_box'>
                                                <div> <img src={questions_pic} alt="questions" /> </div>
                                                <div> <p className='data_numbers'> {questions} </p> </div>
                                                <div> Asked questions </div>
                                        </div>
                                        <div className='data_box'>
                                                <div> <img src={users_pic} alt="questions" /> </div>
                                                <div> <p className='data_numbers'> {users} </p> </div>
                                                <div> Users </div>
                                        </div>
                                        <div className='data_box'> 
                                                <div> <img src={answers_pic} alt="questions" /> </div>
                                                <div> <p className='data_numbers'> {problems}  </p> </div>
                                                <div> Problems </div>
                                        </div>
                                        <div className='data_box'> 
                                                <div> <img src={editors_pic} alt="questions" /> </div>
                                                <div> <p className='data_numbers'> {editors}</p></div>
                                                <div> Editors </div>
                                        </div>
                                </div>
                        </section>
                        <section>
                                <div className='home_container'>
                                        <div className='center space'> <h3> Scoring System </h3> </div>
                                        <div className='flex_row flex_inbetween space'> 
                                                <div className='description_box'> 
                                                        <div> <img className='description_image' src={description_short_box} alt="shape"/> </div>
                                                </div>
                                                <div className='description_box'>
                                                        <div> <img className='description_image' src={description_short_box} alt="shape"/> </div>
                                                </div>
                                        </div>
                                        <div className='description_box'> 
                                                <div> <img className='description_image' src={description_long_box} alt="shape"/> </div>
                                        </div>
                                </div>
                        </section>
                        <HomeFooter></HomeFooter>
                        <LowerFooter></LowerFooter>
                </div>
        );
};

export default Home;