import React from 'react';
import { useEffect, useState } from 'react';

import Latex from 'react-latex';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing Styling
import './pages.css';
import '../App.css';

// Importing components
import LowerFooter from '../Components/Footers/LowerFooter';
import UpperFooter from '../Components/Footers/UpperFooter';
import Header from '../Components/Headers/Headers';
import SubHeader from '../Components/Headers/SubHeader';
import Previews from '../Widgets/Dropezone';
import AskButton from '../Components/Buttons/Ask';
import SmallTagBox from '../Components/Tags/TagSmallCard';

// Importing assets
import save from '../images/input_image.png';

// Importing hooks
import tagsApi from '../hooks/tagsApi';

const SearchPage = () => {
    const [getTags, setTags] = useState([]);
    const [problem, setProblem] = useState();
    const [ desciption, setDescription] = useState();
    const [ suggestedSolution, setSuggestedSolution] = useState();
    const [tagSelected, setTagSelected] = useState();
    const [isActive, setIsActive] = useState(false);

    useEffect(() =>{
        const getTag  = async () =>{
            const tags = await tagsApi.getTags();
            console.log(tags)
            if (tags.data.message === 'Found'){
                const get = tags.data.data;
                setTags(get);
            }
    }; getTag();}, [])

    const selectATag = (e) => {
        setTagSelected(e.target.id);
        setIsActive(!isActive);     
    }

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
                                    return (<SmallTagBox  active={isActive}
                                        onClick={selectATag} key={e.id} id={e.id} title={e.title}> </SmallTagBox>)
                                })  
                            }
                        </div>
                    </div>
                    <div className=''> 
                        <div className='input_container'>
                            <div> <h4 className='page_title'> Ask a question </h4></div>
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
                                            <button className="login"> Submit </button>
                                            <button className="login" onClick={() => {close();}}> Cancel </button>
                                            </div>
                                        </div>
                                        )}
                                    </Popup>
                                    </div>
                                </div>
                                <div> <textarea placeholder="Enter your problem..."></textarea></div>
                            </div>
                            <div className='input_box'> 
                                <div className='flex'> 
                                    <div className='bold sections_title'> Description </div> 
                                    <div>  </div>
                                </div>
                                <div> <textarea placeholder="Enter a description..."></textarea></div>
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
                                            <div className='space'> <Previews></Previews> </div>
                                            
                                            <div className="actions flex_inbetween">
                                            <button className="login"> Submit </button>
                                            <button className="login" onClick={() => {close();}}> Cancel </button>
                                            </div>
                                        </div>
                                        )}
                                    </Popup>
                                    </div>
                                </div>
                                <div> <textarea placeholder="Enter your solution..."></textarea></div>
                            </div>
                            <div className='flex_end'> <AskButton></AskButton> </div>
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