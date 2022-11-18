import React from "react";

// Importing style
import './cards.css';

// Importing buttons
import Solve from '../Buttons/Solve';

const DataCard = (props) => {    
    return(
        <div className='data_box'> 
            <div> <img className="data_image" src={props.pic} alt="questions" /> </div>
            <div> <p className='data_numbers'> {props.number} </p></div>
            <div> {props.type} </div>
        </div>
    )
}

export default DataCard;