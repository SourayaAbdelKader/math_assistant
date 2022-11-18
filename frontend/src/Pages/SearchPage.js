import React from 'react';
import { useEffect, useState } from 'react';

// Importing Components
import LowerFooter from '../Components/Footers/LowerFooter';
import UpperFooter from '../Components/Footers/UpperFooter';
import Header from '../Components/Headers/Headers';
import SubHeader from '../Components/Headers/SubHeader';

import '../App.css';

const SearchPage = () => {
    return (
        <> 
            <div>
                <Header></Header>
                <SubHeader></SubHeader>
                <div  className='flex'>
                    <div className='tag_side_container'> </div>
                    <div className='tag_page_container'> 
                        <div className='search_part'> <input className="input" type="text" placeholder="Search" /> </div>
                        <div className='tags_grid'>
    
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