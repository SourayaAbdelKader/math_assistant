import React from 'react';
import './pages.css'

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import EditorNav from '../Components/Navbar/EditorNav';

const Editors = () => {
    return (
        <div>
            <Header></Header>
            <div className='page_content'>
                <div className='navbar'> <EditorNav></EditorNav></div>
                <div className='content'>
                <div> <h3>Editors</h3></div>
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Editors;