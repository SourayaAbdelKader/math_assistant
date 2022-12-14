import React from 'react';
import { useEffect, useState } from 'react';

// ________________ Asking a question ________________
// The main feature of this website is to ask questions by scaning pictures and/or adding text.
// For the scaning, mathpix (a third party API) is used to convert a base64 (of an image) to a Latex format
// Than we Latex format is handeled to display correctly the math equations scanned

import Latex from 'react-latex';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing Styling
import './pages.css';
import '../App.css';
import ask from '../images/ask.png';
import sent from '../images/sent.png'

// Importing components
import LowerFooter from '../Components/Footers/LowerFooter';
import UpperFooter from '../Components/Footers/UpperFooter';
import Header from '../Components/Headers/Headers';
import SubHeader from '../Components/Headers/SubHeader';
import Previews from '../Widgets/Dropezone';
import AskButton from '../Components/Buttons/Ask';
import SmallTagBox from '../Components/Tags/TagSmallCard';
import Previews2 from '../Widgets/Dropezone2';

// Importing assets
import save from '../images/input_image.png';

// Importing hooks
import tagsApi from '../hooks/tagsApi';
import QuestionAPI from '../hooks/questionsAPI';

const SearchPage = () => {
    const componentRef = React.useRef();

    const [getTags, setTags] = useState([]);
    const [problem, setProblem] = useState();
    const [desciption, setDescription] = useState();
    const [suggestedSolution, setSuggestedSolution] = useState();
    const [open, setOpen] = useState(false);

    // Getting the tags from the db
    useEffect(() =>{
        const getTag  = async () =>{
            const tags = await tagsApi.getTags();
            if (tags.data.message === 'Found'){
                const get = tags.data.data;
                setTags(get);
            }
    }; getTag();}, [])

    // Handeling all the inputs
    function handleProblemChange(event){
        let problem = event.target.value;
        if(problem.length < 15){ 
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        } else { 
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');         
        }
        if (problem.length == 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        setProblem(problem);
    };

    function handleDescriptionChange(event){
        let description = event.target.value;
        setDescription(description);
    };

    function handleSuggestionChange(event){
        let suggestion = event.target.value;
        if(suggestion.length < 15){ 
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        } else { 
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');         
        }
        if (suggestion.length == 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        setSuggestedSolution(suggestion);
    };

    // Validating all the inputs
    function validInputs(){
        if (!localStorage.getItem('selected_tag')){
            componentRef.current.classList.remove('hide');
            return false
        }
        if (problem == suggestedSolution || desciption == suggestedSolution) {
            componentRef.current.classList.remove('hide');
            return false;
        }
        if (!problem || !localStorage.getItem('problem')){ 
            componentRef.current.classList.remove('hide');
            return false;
        }
        if (!suggestedSolution || !localStorage.getItem('suggested_solution')){
            componentRef.current.classList.remove('hide');
            return false;
        }
        componentRef.current.classList.add('hide');
        return true;
    }

    const submitQuestion = (e) => {
        e.preventDefault();
        let final_problem = '';
        let final_description = '';
        let final_solution = '';

        // Handeling the inputs: Since for the problem and for the suggested sollution, we can combine the types text to the latex format comming from scaning an image 
        if (validInputs){
            const user_id = localStorage.getItem('user_id');
            const tag_id = localStorage.getItem('selected_tag');
            if (problem && localStorage.getItem('problem')){
                final_problem = problem + ' ${'+localStorage.getItem('problem')+'}$'; // to get both parts from text and scaning
            } else if (problem){
                final_problem = problem;
            } else {final_problem = '${'+localStorage.getItem('problem')+'}$'}
            if (desciption){ 
                final_description = desciption;
            } else { final_description = ""};
            if (suggestedSolution && localStorage.getItem('suggested_solution')){
                final_solution = suggestedSolution + ' ${'+localStorage.getItem('suggested_solution')+'}$';
            } else if (suggestedSolution){
                final_solution = suggestedSolution;
            } else {final_solution = '${'+localStorage.getItem('suggested_solution')+'}$'}
            addQuestion(user_id, tag_id, final_problem, final_description, final_solution);
        } else {componentRef.current.classList.remove('hide');}
    }

    // Adding question API and clearing storage
    const addQuestion = async (user_id, tag_id, problem, description, suggestedSolution) => {
        const add_question = await QuestionAPI.addQuestion({
            "user_id":user_id,
            "tag_id":tag_id,
            "problem": problem,
            "description": description,
            "suggested_solution": suggestedSolution
        });
        if (add_question.status === 200) {
            setOpen(true);
            localStorage.removeItem('suggested_solution');
            localStorage.removeItem('problem');
            localStorage.removeItem('selected_tag');
        }
    }

    // There are 2 type of dropezone to handle the two scaning inputs, one for the problem and one for the suggested solution
    return (
        <> 
            <div>
                <Header></Header>
                <SubHeader></SubHeader>
                <div  className='flex full_container'>
                    <div className='tags_input_container'>
                        <div className='tag_menu'>
                            <div className='menu_title'> Pick a tag </div>
                            { 
                                getTags?.map((e) => {
                                    return (<SmallTagBox key={e.id} id={e.id} title={e.title}> </SmallTagBox>)
                                })  
                            }
                        </div>
                    </div>
                    <div className=''> 
                        <div className='input_container'>
                            <div> <h4 className='page_title'> Ask a question </h4></div>
                            <div> <p ref={node => componentRef.current = node} className="error_text hide space"> Some informtation are missing... </p> </div>
                            <div className='input_box'> 
                                <div className='flex_inbetween'> 
                                    <div className='bold sections_title'> Problem </div> 
                                    <div> 
                                    <Popup trigger={<img className='medium_icon' src={save} alt="import"/>} modal nested >
                                        {close => (
                                        <div className="modal">
                                            <button className="close" onClick={close}>
                                            &times;
                                            </button>
                                            <div className="header center space"> <h3> Insert an image </h3> </div>
                                            <div className='space'> <Previews></Previews> </div>
                                            <div className="actions flex_inbetween">
                                                <button className="login" onClick={() => {close();}}> Submit </button>
                                                <button className="login" onClick={() => {close();}}> Cancel </button>
                                            </div>
                                        </div>
                                        )}
                                    </Popup>
                                    </div>
                                </div>
                                <div> <textarea onChange={handleProblemChange} placeholder="Enter your problem..."></textarea></div>
                            </div>
                            <div className='input_box'> 
                                <div className='flex'> 
                                    <div className='bold sections_title'> Description </div> 
                                    <div>  </div>
                                </div>
                                <div> <textarea onChange={handleDescriptionChange} placeholder="Enter a description..."></textarea></div>
                            </div>
                            <div className='input_box'> 
                                <div className='flex_inbetween'> 
                                    <div className='bold sections_title'> Suggested Solution </div> 
                                    <div> 
                                    <Popup trigger={<img className='medium_icon' src={save} alt="import"/>} modal nested >
                                        {close => (
                                        <div className="modal">
                                            <button className="close" onClick={close}>
                                            &times;
                                            </button>
                                            <div className="header center space"> <h3> Insert an image </h3> </div>
                                            <div className='space'> <Previews2></Previews2> </div>
                                            <div className="actions flex_inbetween">
                                                <button className="login" onClick={() => {close();}}> Submit </button>
                                                <button className="login" onClick={() => {close();}}> Cancel </button>
                                            </div>
                                        </div>
                                        )}
                                    </Popup>
                                    </div>
                                </div>
                                <div> <textarea onChange={handleSuggestionChange} placeholder="Enter your solution..."></textarea></div>
                            </div>
                            <Popup open={open} modal nested >
                                {close => (
                                    <div className="modal flex">
                                        <button className="close space_right" onClick={close}>
                                        &times;
                                        </button>
                                        <div className='flex'> <img className='medium_icon' src={sent} alt='sent' /> <h3> Question Added Successfully </h3></div>
                                    </div>
                                )}
                            </Popup>
                            <div className='flex_end'> <div> <button onClick={submitQuestion} className="ask_button"> <img className="s_icon" src={ask} alt="ask" /> ASK </button> </div> </div>
                        </div>
                    </div>
                </div>
                <UpperFooter></UpperFooter>
                <LowerFooter></LowerFooter>
            </div>
        </>
    );
};
    
export default SearchPage;