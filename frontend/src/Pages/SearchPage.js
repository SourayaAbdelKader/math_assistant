import React from 'react';
import { useEffect, useState } from 'react';

// Importing Components
import LowerFooter from '../Components/Footers/LowerFooter';
import UpperFooter from '../Components/Footers/UpperFooter';
import Header from '../Components/Headers/Headers';
import SubHeader from '../Components/Headers/SubHeader';
import SearchSidebar from '../Components/Sidebars/SearchSidebar';
import empty_state from '../images/search_empty_state.png'
import QuestionAPI from '../hooks/questionsAPI';
import QuestionWidget from '../Widgets/QuestionWidget';
import '../App.css';

const SearchPage = () => {

    const [empty, setEmpty] = useState(false);
    const [isSearching, setIsSearching] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [search, setSearch] = useState('')

        // Handeling the search
        function handleSearch(event){
            let search_word = event.target.value;
            if (search_word.length > 2){
                setIsSearching(true)
                setSearch(search_word);
                searching(search)
            } else {setIsSearching(false); setEmpty(false) }
            if (search_word.length == 0){ setEmpty(true)}
        } 
    
        const searching = async(search) => {
            const search_question = await QuestionAPI.searchQuestion(search);
            console.log(search_question)
            if (search_question.data.message == 'Question Not Found'){
                setEmpty(true)
            } else {setSearchResult(search_question.data.data)}
            console.log(search_question)
         };
         
    return (
        <> 
            <div>
                <Header></Header>
                <SubHeader></SubHeader>
                <div  className='flex'>
                    <div className='tag_side_container '> <SearchSidebar></SearchSidebar> </div>
                    <div className='question_page_container wide'> 
                        <div className='search_part'> <input onChange={handleSearch} className="input" type="text" placeholder="Search" /> </div>
                        <div className='wide'>
                        {
                            empty && (<div className='empty_state'> <img src={empty_state} alt="empty_state"/> </div>)    
                        }
                        { 
                          !empty &&searchResult?.map((e) => {
                            return (<QuestionWidget key={e.id} id={e.id} picture_url={e.picture_url} name={e.name}  title={e.title} problem={e.problem} description={e.description} suggested_solution={e.suggested_solution}></QuestionWidget>)
                        }) 
                    }
    
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