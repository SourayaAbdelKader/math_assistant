import React from "react";

// Importing styling and assets
import './tags.css'
import tag_image from '../../images/tags.png'

const TagCArd = (props) => {
    return(
        <div id={props.id} className="tag_container cursor_tag">
            <div className="tag_flex"> 
                <div> <img className="tag_logo" src={tag_image} alt='tag'/> </div>
                <div> <h4 className="title"> {props.title} </h4> </div>  
            </div>
            <div> <p className="description"> {props.description} </p> </div>
        </div>        
    )
}

export default TagCArd;