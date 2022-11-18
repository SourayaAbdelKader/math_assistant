import React from "react";
import {useState} from 'react';

import './tags.css'

const SmallTagBox = (props) => {

    const [isActive, setIsActive] = useState(false);

    const selectATag = (e) => {
        localStorage.setItem('selected_tag',props.id);
        setIsActive(!isActive);
    }

    return(
        <div onClick={selectATag} active={isActive} style={{
            backgroundColor: isActive ? '#E09E50' : 'White',
            color: isActive ? 'white':  'black',
          }} id={props.id} className='tag_name_box' key={props.id}> {props.title} </div>      
    )
}

export default SmallTagBox;