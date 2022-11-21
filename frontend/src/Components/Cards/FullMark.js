import React from "react";

// Importing style
import './cards.css';

// Importing images
import full_mark from '../../images/full_marked_icon.png';
import circle_box from '../../images/block_circle.png';

const FullMark = (props) => {
    return(
        <div className="score_box"> 
            <div className="content"> 
                <div className="line_space"> <img src={full_mark} alt='full_mark'/> </div>
                <div className="flex small_line_space"> <h3 className="space_right">Full Marked Practice:</h3> <h3>{props.total}</h3></div>
            </div>
            <div> <img className="trapezoid" src={circle_box} alt=''/> </div>
        </div>
    )
}

export default FullMark;