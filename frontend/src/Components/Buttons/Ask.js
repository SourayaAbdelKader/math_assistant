import React from "react";

// Importing styling and assets
import './buttons.css';
import ask from '../../images/ask.png';

const AskButton = () => {
    return(<div> <button className="ask_button"> <img className="s_icon" src={ask} alt="ask" /> ASK </button> </div>)
}

export default AskButton;