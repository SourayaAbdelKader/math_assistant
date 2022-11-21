import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

// Importing styling and assets
import './buttons.css';
import search from '../../images/search.png';

const SearchButton = () => {

    const navigate = useNavigate();
    const navigateSearch = () => {navigate('/search');};

    return(<div> <button className="search" onClick={navigateSearch}> <img className="small_icon" src={search} alt='search'/> SEARCH </button> </div>)
}

export default SearchButton;