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
import tags_empty_state from '../images/search_empty_state.png'

// Importing hooks
import tagsApi from '../hooks/tagsApi';

const Tags = () => {

    const componentRef = React.useRef();
    const [getTagsData, setTags] = useState([]);
    const [empty, setEmpty] = useState(false);
    const [isSearching, setIsSearching] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false);

    // Handeling the data
    useEffect(() =>{
        const getTag  = async () =>{
            setLoading(true);
            const tags = await tagsApi.getTags();
            if (tags.data.message === 'Found'){
                const get = tags.data.data;
                setTags(get);
                setLoading(false);
            } else {setEmpty(true)}
    }; getTag();}, [])

    // Handeling the search
    function handleSearch(event){
        let search_word = event.target.value;
        if (search_word.length > 3){
            setIsSearching(true)
            setSearch(search_word);
            searching(search)
        } else {setIsSearching(false); setEmpty(false) }
    }

    const searching = async(search) => {
        const search_tag = await tagsApi.searchTags(search);
        if (search_tag.data.message == 'Tag Not Found'){
            setEmpty(true)
        } else {setSearchResult(search_tag.data.data)}
     };

    return (     
        <div>
            <Header></Header>
            <TagSubHeader></TagSubHeader>
            <div  className='flex'>
                <div className='tag_side_container'> <TagSidebar> </TagSidebar></div>
                <div className='tag_page_container'> 
                    <div className='tag_search_part'> <input onChange={handleSearch} className="input"  type="text" placeholder="Search" /> </div>                        
                        {
                            empty && (<div className='empty_state'> <img src={tags_empty_state} alt="empty_state"/> </div>)    
                        }
                    <div className='tags_grid'>
                        {
                            !empty && isSearching && (searchResult?.map((e) => {
                                return (<TagCard id={e.id} title={e.title} description={e.description}></TagCard>)
                            }))
                        }
                        { 
                            !empty && !isSearching && getTagsData?.map((e) => {
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