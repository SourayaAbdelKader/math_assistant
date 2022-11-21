import React from 'react';
import './pages.css'

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import Navbar from '../Components/Navbar/Navbar';
import { Chart } from "react-google-charts";

const Dashboard = () => {
     const data = [
        ["Task", "Hours per Day"],
        ["User", 11],
        ["admin", 2],
        ["editor", 2],
      ];
      
    const options = {
        title: "User distributy",
      };

    return (
        <div>
            <Header></Header>
            <div className='page_content flex'>
                <div className='navbar'> <Navbar></Navbar></div>
                <div className='content'>
                    <div className='chart'>  
                        <Chart
                            chartType="PieChart"
                            data={data}
                            options={options}
                            width={"50%"}
                            height={"400px"}
                        />
                </div>
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Dashboard;