import React from 'react';
import './pages.css';
import {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import PracticeNav from '../Components/Navbar/PracticeNav';
import PracticeWidget from '../Widget/PracticeWidget';
import PracticeAPI from '../hooks/PracticeAPI';

import {checkInputIsNumber, checkInputIsLevel, checkEmptyInput} from '../Utils/Utils'

const Practice = () => {

    const componentRef = React.useRef();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('');
    const [points, setPoints] = useState('');
    const [image, setImage] = useState('');
    const [tagNumber, setTagNumber] = useState('');

    const [practice, setPractice] = useState([]);
    useEffect(() =>{
        const getUsers  = async () =>{
            const get_users = await PracticeAPI.getPractices();
            console.log(get_users)
            if (get_users.data.message === 'Found'){
                const get = get_users.data.data;
                setPractice(get);
            }
    }; getUsers();}, []);

    const handleTitle = (event) => {
        let string = event.target.value;
        if (!checkEmptyInput(string)){
            setTitle(string)
        }
    }

    const handleDescription = (event) => {
        let string = event.target.value;
        if (!checkEmptyInput(string)){
            setDescription(string)
        }
    }

    const handleLevel = (event) => {
        let string = event.target.value;
        if (checkInputIsLevel(string)){
            setLevel(string)
        }
    }

    const handlePoints= (event) => {
        let string = event.target.value;
        if (checkInputIsNumber(string)){
            setPoints(string)
        }
    }

    const handleTag = (event) => {
        let string = event.target.value;
        if (checkInputIsNumber(string)){
            setTagNumber(string)
        }
    }
 
    const handleImage = (event) => {
        let string = event.target.value;
        if (checkInputIsNumber(string)){
        }
    }
    

    const validInputs = () => {

    }

     // Calling the API
     const addPractice = async (title, description, points, level, picture_url, user_id, tag_id) => {
        const add_practice = await PracticeAPI.addPractice({
            "title":title,
            "description":description,
            "points":points,
            "level":level,
            "picture_url": picture_url,
            "user_id": user_id,
            "tag_id":tag_id, 
        });
        componentRef.current.classList.add('hide');
     };

    return (
        <div>
            <Header></Header>
            <div className='page_content'>
                <div className='navbar'> <PracticeNav></PracticeNav></div>
                <div className='content'>
                <div className='flex_between space'> 
                    <h3>Practice</h3>
                    <Popup trigger={<button className='login bold'>ADD PRACTICE</button>} modal nested >
                        {close => (
                            <div className="modal">
                            <button className="close" onClick={close}>
                            &times;
                            </button>
                                <div className='modal_content'>
                                        <div className="header center space"> <h3> Add Practice </h3> </div>
                                        <div className="space row"> <input onChange={handleTitle} className="input"  type="text" placeholder="Title" /></div>
                                        <div className="space row"> <input onChange={handleDescription} className="input" type="text" placeholder="Description" /></div>
                                        <div className="space row"> <input onChange={handlePoints} className="input"  type="text" placeholder="Points" /></div>
                                        <div className="space row"> <input onChange={handleLevel} className="input"  type="text" placeholder="Level" /></div>
                                        <div className="space row"> <input onChange={handleTag} className="input"  type="text" placeholder="Tag Number" /></div>
                                        <div> <p ref={node => componentRef.current = node} className="error_text hide space"> Invalid Inputs </p> </div>                                                
                                        <div className="parent-div">
                                        <button className="btn-upload"> Add Picture </button>
                                        <input onChange={handleImage} type="file" name="upfile" />
                                        </div>
                                        <div className="actions flex_around">
                                        <button  className="login bold space_right"> Submit </button>
                                        <button className="login" onClick={() => {close();}}> Cancel </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                <div className='flex_between row_table'> 
                        <div className='grow cell bold'> Title </div>
                        <div className='cell bold'> Level </div>
                        <div className='cell bold'> Points </div>
                        <div className='small_cell bold'> Edit </div>
                        <div className=' small_cell bold'> Delete </div>
                </div>
                    { 
                            practice?.map((e) => {                            
                                return (
                                    <PracticeWidget id={e.id} title={e.name} description={e.description} level={e.level} points={e.points}></PracticeWidget>
                                )
                            })  
                    }
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Practice;