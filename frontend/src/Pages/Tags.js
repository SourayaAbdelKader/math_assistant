import React from 'react';
import { useEffect, useState } from 'react';

// Importing style
import '../App.css';

// Importing Components
import LowerFooter from '../Components/Footers/LowerFooter';
import UpperFooter from '../Components/Footers/UpperFooter';
import Header from '../Components/Headers/Headers';
import TagSubHeader from '../Components/Headers/TagSubHeader';
import TagSidebar from '../Components/Sidebars/TagSidebar';
import TagCard from '../Components/Tags/TagCard';

// Importing assets 
import tags_empty_state from '../images/tag_empty_state.png'

// Importing hooks
import tagsApi from '../hooks/tagsApi';

const Tags = () => {
    const componentRef = React.useRef();
    const [getTagsData, setTags] = useState([]);
    const[empty, setEmpty] = useState(["empty"]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const getTag  = async () =>{
            setLoading(true);
            const tags = await tagsApi.getTags();
            console.log(tags)
            if (tags.data.message === 'Found'){
                const get = tags.data.data;
                setTags(get);
                setLoading(false);
            }
            if (tags.data.message ==! 'Found' || getTagsData.length == 0){
                setEmpty([]);
            }
    }; getTag();}, [])

    return (     
        <div>
            <Header></Header>
            <TagSubHeader></TagSubHeader>
            <div  className='flex'>
                <div className='tag_side_container'> <TagSidebar> </TagSidebar></div>
                <div className='tag_page_container'> 
                    <div className='tag_search_part'> <input className="input"  type="text" placeholder="Search" /> </div>                        
                        {
                            empty?.map((e) => {
                                return (<div className='empty_state'> <img src={tags_empty_state} alt="empty_state"/> </div>)
                            })
                        }
                    <div className='tags_grid'>
                        { 
                            getTagsData?.map((e) => {
                                return (<TagCard id={e.id} title={e.title} description={e.description}></TagCard>)
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
    
export default Tags;