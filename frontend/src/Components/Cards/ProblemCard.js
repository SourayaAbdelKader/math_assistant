import React from "react";

// Importing style
import './cards.css';

// Importing buttons
import Solve from '../Buttons/Solve';

const ProblemCard = (props) => {    
    return(
        <div id={props.id} className="problem_card flex"> 
            <div> 
                <div> <h4 className="question_title"> Question {props.id} </h4> </div>
                <div> <p className="question_name"> {props.name} </p> </div>
            </div>
            <div> <Solve onClick={props.onClick}></Solve> </div>
        </div>
    )
}

export default ProblemCard;