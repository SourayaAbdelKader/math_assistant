import React from "react";

// Importing style
import './cards.css';

// Importing button
import NotChecked from "../Buttons/NotChecked";

const UnCheckedProblem = (props) => {
    return(
        <div id={props.id} className="problem_card flex"> 
            <div> 
                <div> <h4 className="question_title"> Question {props.id} </h4> </div>
                <div> <p className="question_name"> {props.name} </p> </div>
            </div>
            <div> <NotChecked></NotChecked> </div>
        </div>
    )
}

export default UnCheckedProblem;