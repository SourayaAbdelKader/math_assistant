import React from 'react';
import { useState, useEffect } from 'react';
import './pages.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import EditorNav from '../Components/Navbar/EditorNav';
import UsersAPI from '../hooks/UsersAPI';
import validEmail, {validName, validPassword} from '../Utils/Utils';

const Editors = () => {

    const [open, setOpen] = useState(false);

    const componentRef = React.useRef();

    const [editors, setEditors] = useState([]);
    useEffect(() =>{
        const getUsers  = async () =>{
            const get_users = await UsersAPI.getEditors();
            console.log(get_users)
            if (get_users.data.message === 'Found'){
                const get = get_users.data.data;
                setEditors(get);
            }
    }; getUsers();}, [])

    const [email, setEmail] = useState() // For input
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    // Handeling the inputs
    function handleChange(event) {
        let email = event.target.value;
        if(! validEmail(email)){ 
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        } else { 
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        if (email.length === 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        setEmail(email);
    }

    function handlePassword(event){
        let password = event.target.value;
        if(! validPassword(password)){ 
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        } else { 
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        if (password.length === 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        setPassword(password);
    }

    function handleName(event) {
        let name = event.target.value;
        if(! validName(name)){ 
            componentRef.current.classList.remove('hide');
            event.target.classList.add('error_box');
        } else { 
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        if (name.length === 0) {
            componentRef.current.classList.add('hide');
            event.target.classList.remove('error_box');
        }
        setName(name);
    }

    // Submitting inputs
    const onSubmit = (e) => {
        if (email && password && name){
            addEditor(name, email, password);     
            setOpen(true)   
        }
        e.preventDefault();  
    }

    // Calling the API
    const addEditor = async (name, email, password) => {
        const add_editor = await UsersAPI.addEditor({
            "name":name,
            "email":email,
            "password":password,
        });
        componentRef.current.classList.add('hide');
        setEmail('');
        setPassword('');
        setName('');
     };
    
    return (
        <div>
            <Header></Header>
            <div className='page_content'>
                <div className='navbar'> <EditorNav></EditorNav></div>
                <div className='content'>
                    <div className='flex_between space'> 
                        <h3 className=''>Editors</h3>
                        <Popup trigger={<button className='login bold'>ADD EDITOR</button>} modal nested >
                                        {close => (
                                        <div className="modal">
                                            <button className="close" onClick={close}>
                                            &times;
                                            </button>
                                            <div className='modal_content'>
                                                <div className="header center space"> <h3> Add Editor </h3> </div>
                                                <div className="space row"> <input onChange={handleName} className="input"  type="text" placeholder="Name" /></div>
                                                <div className="space row"> <input onChange={handleChange} className="input" type="email" placeholder="Email" /></div>
                                                <div className="space row"> <input onChange={handlePassword} className="input"  type="password" placeholder="Password" /></div>
                                                <div> <p ref={node => componentRef.current = node} className="error_text hide space"> Invalid Inputs </p> </div>
                                                {open && (
        <div
          className="modal fade"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          ADDEDDDDDDDDDDDDDDDDDDDDDD
        </div>
      )}
                                                <div className="actions flex_around">
                                                <button onClick={onSubmit} className="login space_right"> Submit </button>
                                                <button className="login" onClick={() => {close();}}> Cancel </button>
                                                </div>
                                            </div>
                                        </div>
                                        )}
                                    </Popup>
                                    

                    </div>
                    <div className='flex_between row_table'> 
                        <div className='column bold'> Name </div>
                        <div className='column bold'> Email </div>
                        <div className='column bold'> Phone </div>
                        <div className='column bold'> Degree </div>
                    </div>
                    { 
                            editors?.map((e) => {                            
                                return (
                                    <div key={e.id} className='flex_between row_table'> 
                                    <div className='column'> {e.name} </div>
                                    <div className='column'> {e.email} </div>
                                    <div className='column'> {e.phone}  </div>
                                    <div className='column'> {e.degree}  </div>
                                    </div>
                                )
                            })  
                    }
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Editors;