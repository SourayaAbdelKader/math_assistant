import React from "react";

// Importing style
import './cards.css';

// Importing images
import circle_box from '../../images/block_circle.png'

const ScoreCard = () => {
    return(
        <div className="score_box flex"> 
            <div> 
                <div> <h4> title </h4> </div>
                <div> <p> desc</p> </div>
            </div>
            <div> <img src={circle_box} alt=''/> </div>
        </div>
    )
}

export default ScoreCard;