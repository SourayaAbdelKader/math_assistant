import React from "react";

import './tags.css'

const SmallTagBox = (props) => {
    return(
        <div onClick={props.onClick} style={{
            backgroundColor: props.active ? '#E09E50' : 'White',
            color: props.active ? 'white':  'black',
          }} id={props.id} className='tag_name_box' key={props.id}> {props.title} </div>      
    )
}

export default SmallTagBox;