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

    const data2 = [
        ["Year", "Sales", "Expenses"],
        ["2014", 1000, 400],
        ["2015", 1170, 460],
        ["2016", 660, 1120],
        ["2017", 1030, 540],
      ];

    const options2 = {
        chart: {
          title: "Performance",
          subtitle: "",
        },
      };

    return (
        <div>
            <Header></Header>
            <div className='page_content'>
                <div className='navbar'> <Navbar></Navbar></div>
                <div className='content'>
                <section>
                    {/* <div>     
                        <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"400px"}
                        />
                </div>
                <div>
                    <Chart
                    chartType="Bar"
                    width="50%"
                    height="20px"
                    data={data2}
                    options={options2}
                    />
                </div> */}
                </section>

                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Dashboard;