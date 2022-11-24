import React from 'react';
import {useEffect, useState} from 'react';
import { Chart } from "react-google-charts";

// Importing styling
import './pages.css'

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import Navbar from '../Components/Navbar/Navbar';

// Importing hooks
import DashboardAPI from '../hooks/DashboardAPI';
import TadAPI from '../hooks/TagAPI';
import PracticeAPI from '../hooks/PracticeAPI';

const Dashboard = () => {

    const [tagsNumber, setTagsNumber] = useState(0);
    const [questionsNumber, setQuestionsNumber] = useState(0);
    const [problemsNumber, setProblemsNumber] = useState(0)

    const [usersNumber, setUsersNumber] = useState(0);
    const [editorsNumber, setEditorsNumber] = useState(0);
    const [adminsNumber, setAdminsNumber] = useState(0);
    const [checked, setChecked] = useState(0);
    const [unchecked, setUnchecked] = useState(0);
    const [tags, setTags] = useState([]);
    const [ids, setIds] = useState([]);
    const [practiceIds, setPracticeIds] = useState([]);
    const [histogramData, setHistogramData] = useState([]);
    const [histogramData2, setHistogramData2] = useState([]);
    const [histogramData3, setHistogramData3] = useState([]);
    const [practice, setPractice] = useState([]);

    useEffect(() =>{
        const getData  = async () =>{
                const count_users = await DashboardAPI.countUsers();
                const count_editors = await DashboardAPI.countEditors();
                const problem_data = await DashboardAPI.countAdmins();
                const questions_data = await DashboardAPI.countQuestions();
                const checked_problems = await DashboardAPI.countCheckedProblems();
                const unchecked_problems = await DashboardAPI.countUncheckedProblems();
                setUsersNumber(count_users.data.data);
                setEditorsNumber(count_editors.data.data);
                setAdminsNumber(problem_data.data.data);
                setChecked(checked_problems.data.data);
                setUnchecked(unchecked_problems.data.data);
                setQuestionsNumber(questions_data);

                const get_tags = await TadAPI.getTags();
                if (get_tags.data.message === 'Found'){
                    const get = get_tags.data.data;
                    setTags(get);
                    setTagsNumber(get.length)
                }

                const get_practices = await PracticeAPI.getPractices();
                if (get_practices.data.message === 'Found'){
                    const get = get_practices.data.data;
                    setPractice(get);
                    setProblemsNumber(get.length)
                }

                const practice_ids = [];
                const practice_name = [];
                for(let i= 0; i < practice.length; i ++) {
                    practice_ids.push(practice[i].id);
                    practice_name.push(practice[i].name);
                }
                setPracticeIds(practice_ids);
                let count_checked_per_problem = [];
                let count_unchecked_per_problem = [];

                
                for (let i of practiceIds){
                    const checked_problem = await DashboardAPI.countCheckedSolutionsPerProblems(i);
                    count_checked_per_problem.push(checked_problem.data.data)
                    const uncheched_problems = await DashboardAPI.countUncheckedSolutionsPerproblem(i);
                    count_unchecked_per_problem.push(uncheched_problems.data.data)
                }
                const histogram_data3 = [['Solutions per problems', 'Checked', 'Unchecked']]
                for (let i =0; i < practice.length; i++){
                    histogram_data3.push([practice_name[i], count_checked_per_problem[i], count_unchecked_per_problem[i]])
                }
                setHistogramData3(histogram_data3);

                const id = [];
                const tag_names = [];
                for(let i= 0; i < tags.length; i ++) {
                    id.push(tags[i].id);
                    tag_names.push(tags[i].title)
                }

                setIds(id)
                let count_problem_per_tag = [];
                let count_question_per_tag = [];
                for (let i of ids){
                    const problem_per_tag = await DashboardAPI.countProblemsPerTag(i);
                    count_problem_per_tag.push(problem_per_tag.data.data)
                    const questions_per_tag = await DashboardAPI.countQuestionsPerTag(i);
                    count_question_per_tag.push(questions_per_tag.data.data)
                }
                const histogram_data = [['Tags', 'Number of problems per tag']];
                const histogram_data2 = [['Tags', 'Number of questions per tag']]
                for (let i =0; i < tags.length; i++){
                    histogram_data.push([tag_names[i], count_problem_per_tag[i]])
                    histogram_data2.push([tag_names[i], count_question_per_tag[i]])
                }
                setHistogramData(histogram_data);
                setHistogramData2(histogram_data2)
                console.log(histogram_data)
                console.log(histogram_data2)
                console.log(histogram_data3)
    }; getData();}, []); 

    const options3 = {
        chart: {
          title: "Status of solutions ",
          subtitle: "Based on most recent and previous census data",
        },
        hAxis: {
          title: "Problems",
          minValue: 0,
        },
        vAxis: {
          title: "Solutions",
        },
        bars: "horizontal",
        axes: {
          y: {
            0: { side: "right" },
          },
        },
      };

     const user_types_data = [
        ["Task", "Hours per Day"],
        ["User", usersNumber],
        ["admin", editorsNumber],
        ["editor", adminsNumber],
      ];

      const problem_status = [
        ["Solution", "Status"],
        ["Checked", checked],
        ["Unchecked", unchecked],
      ];
      
    const user_types_options = {
        title: "Users distributy",
    };

    const problem_type_option = {
        title: "Problem's Solutions Status",
    };


    const options = {
        chart: {
          title: "Problems Per Tag",
        },
    };

    const options2 = {
        chart: {
          title: "Questions Per Tag",
        },
    };

    return (
        <div>
            <Header></Header>
            <div className='page_content flex'>
                <div className='navbar'> <Navbar></Navbar></div>
                <div className='content'>
                    <div className=''>  
                        <Chart
                            chartType="PieChart"
                            data={user_types_data}
                            options={user_types_options}
                            width={"80%"}
                            height={"300px"}
                        />
                    </div>
                    <div>
                    <Chart
                            chartType="PieChart"
                            data={problem_status}
                            options={problem_type_option}
                            width={"80%"}
                            height={"300px"}
                        />
                    </div>
                    <div>
                        <Chart
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={histogramData}
                        options={options}
                        />
                    </div>
                    <div>
                        <Chart
                        chartType="Bar"
                        width="100%"
                        height="400px"
                        data={histogramData2}
                        options={options2}
                        />s
                    </div>
                    <div>
                    <Chart
                    chartType="Bar"
                    width="100%"
                    height="800px"
                    data={histogramData3}
                    options={options3}
                    />
                    </div>
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Dashboard;