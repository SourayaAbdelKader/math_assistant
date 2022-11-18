import React from "react";

// Importing style
import './cards.css';

// Importing images
import circle_box from '../../images/block_circle.png'

const ScoreCard = (props) => {
    return(
        <div className="score_box"> 
            <div className="content"> 
                <div className="line_space"> <h3> Scores </h3> </div>
                <div className="flex small_line_space"> <p className="detail_title"> Total score:  </p> <p>{props.total}</p></div>
                <div className="flex small_line_space"> <p className="detail_title"> Answers score:</p> <p> {props.answers} </p> </div>
                <div className="flex"> <p className="detail_title"> Practice score:</p> <p> {props.practice} </p> </div>
            </div>
            <div> <img className="trapezoid" src={circle_box} alt=''/> </div>
        </div>
    )
}

export default ScoreCard;