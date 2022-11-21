import React from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';

import './headers.css';

const PracticeSubHeader = () => {

    const navigate = useNavigate();
    const navigateTags = () => {navigate('/tags');};
    const navigateQuestions = () => {navigate('/questions');};
    const navigatePractice = () => {navigate('/practice');};

    return(
        <div className="sub_header_container">
            <div> <h4 className="shadow hover-underline-animation" onClick={navigateTags}> Tags </h4> </div>
            <div> <h4 className="shadow hover-underline-animation" onClick={navigateQuestions}> Questions </h4> </div>
            <div> <h4 className="shadow unerline bold hover-underline-animation" onClick={navigatePractice}> Practice </h4> </div>
        </div>   
    )
}

export default PracticeSubHeader;