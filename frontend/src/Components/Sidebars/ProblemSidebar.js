import React from "react";

import './sidebars.css';
import ViewSolve from "../Buttons/ViewSolved";

const ProblemSidebar = () => {
    return(
        <div className="side_container">
            <div> <h3> Problems </h3> </div>
            <div className="button_side"> <ViewSolve></ViewSolve> </div>   
        </div>        
    )
}

export default ProblemSidebar;