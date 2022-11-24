import React from "react";
import {useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Importing style and assets
import './widget.css';
import messageSent from '../images/sent.png';

// Importing utils function
import {checkEmptyInput} from '../Utils/Utils'

// Importing hooks
import TagAPI from '../hooks/TagAPI';

const AddTag = (props) => {

    const componentRef = React.useRef();

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false); 

    const handleTitle = (event) => {
        let string = event.target.value;
        if (!checkEmptyInput(string)){
            setTitle(string)
        }
    }

    const handleDescription = (event) => {
        let string = event.target.value;
        if (!checkEmptyInput(string)){
            setDescription(string)
        }
    }

    const validInputs = (title, description) => {
        if (title && description){
            return true;
        } 
        return false;
    }

    const submitTag = (e) => {
        e.preventDefault();
        if (validInputs(title, description)){
            addTag(title, description)
        } else {
            setMessage('Invalid Inputs')
            componentRef.current.classList.remove('hide');
        }
    }

    // Calling the API
    const addTag = async (title, description) => {
        const add_tag = await TagAPI.addTag({
            "title":title,
            "description":description,
        });
        if (add_tag.data.message == 'Added Successfully'){
            setOpen(true)
            componentRef.current.classList.add('hide');
            setTitle('');
            setDescription('');
        } else {componentRef.current.classList.remove('hide');
            setMessage(add_tag.data.message)
        };
    };
    
    return(
        <div key={props.id} id={props.id} className=''> 
            <Popup trigger={<button className='login bold'>ADD TAG</button>} modal nested >
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                        &times;
                        </button>
                        <div className='modal_content'>
                                <div className="header center space"> <h3> Add Tag </h3> </div>
                                <div className="space row"> <input onChange={handleTitle} className="input"  type="text" placeholder="Title" /></div>
                                <div className="space row"> <input onChange={handleDescription}  className="input"  type="text" placeholder="Description"/></div>
                                {
                                    open && (<div className='message_sent'> <img className='medium_icon' src={messageSent} alt='sent'/> Tag Added Successfully </div>)
                                }
                                <div> <p ref={node => componentRef.current = node} className="error_text hide space"> {message} </p> </div>                                                
                                <div className="actions flex_around">
                                <button  onClick={(e) => {submitTag(e); setTimeout(() => {close(); setOpen(false)}, 2000);}} className="login bold space_right"> Submit </button>
                                <button className="login" onClick={() => {close();}}> Cancel </button>
                            </div>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export default AddTag;