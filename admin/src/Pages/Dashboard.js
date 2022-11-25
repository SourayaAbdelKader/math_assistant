import React from 'react';
import {useEffect, useState} from 'react';
import { Chart } from "react-google-charts";

// Importing styling
import './pages.css';
import questions_pic from '../images/dash_questions.png';
import users_pic from '../images/dash_users.png';
import tags_pic from '../images/tags.png';
import problem_pic from '../images/dash_practice.png';

// Importing Components
import LowerFooter from '../Components/LowerFooter';
import Header from '../Components/Headers/Header';
import Navbar from '../Components/Navbar/Navbar';
import DataCard from '../Components/Cards/DataCard';

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

    // Handeling the filtering of the coming data (setting the data for the pie charts)
    const [tags, setTags] = useState([]);
    const [ids, setIds] = useState([]);
    const [practiceIds, setPracticeIds] = useState([]);
    const [practice, setPractice] = useState([]);

    // To handle the data flow on the dashboard, the data will be checked if it's arrived before displaying the charts
    // Historgram : Distributivity of practices per tags
    // Histogram 2: Distributivity of questions per tags
    // Histogram 3: Solutions status per practice exercice (checked/unchecked)
    const [isHistogramData, setIsHistogramData] = useState(false);
    const [isHistogramData2, setIsHistogramData2] = useState(false);
    const [isHistogramData3, setIsHistogramData3] = useState(false);
    const [histogramData, setHistogramData] = useState([]);
    const [histogramData2, setHistogramData2] = useState([]);
    const [histogramData3, setHistogramData3] = useState([]);

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
                setQuestionsNumber(questions_data.data.data);

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
                // Getting the practices and counting checked and unchecked solutions per practice
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
                const histogram_data3 = [['Practices', 'Checked', 'Unchecked']]
                for (let i =0; i < practice.length; i++){
                    histogram_data3.push([practice_name[i], count_checked_per_problem[i], count_unchecked_per_problem[i]])
                }
                if (histogram_data3.length > 1){setIsHistogramData3(true);setHistogramData3(histogram_data3);
                }
                
                // Counting practices and questions per tags
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
                const histogram_data = [['Tags', 'Number of practices per tag']];
                const histogram_data2 = [['Tags', 'Number of questions per tag']]
                for (let i =0; i < tags.length; i++){
                    histogram_data.push([tag_names[i], count_problem_per_tag[i]])
                    histogram_data2.push([tag_names[i], count_question_per_tag[i]])
                }
                if (histogram_data.length > 2){setIsHistogramData(true); setHistogramData(histogram_data)};
                if (histogram_data2.length > 2){setIsHistogramData2(true); setHistogramData2(histogram_data2)}
    }; getData();}, []); 

    // Handeling the data for the pie charts
    const user_types_data = [
        ["Users type", "Number per type"],
        ["User", usersNumber],
        ["admin", editorsNumber],
        ["editor", adminsNumber],
    ];

    const problem_status = [
        ["Solution", "Status"],
        ["Checked", checked],
        ["Unchecked", unchecked],
    ];
    
    // Handeling the titles and subtitles of the charts
    // For pie charts
    const user_types_options = {title: "Users distributy per user type",};

    const problem_type_option = {
        title: "Solutions Status",
        subtitle: "Checked and unchecked practices solutions",
    };
    // For histogram charts
    const options = {chart: {title: "Distribution of practices per tags",},};
    const options2 = {chart: {title: "Distribution of questions per tags",},};
    const options3 = {
        chart: {
          title: "Status of the practices solutions",
          subtitle: "Checked and unchecked solutions per a practice exercice",
        },
        hAxis: {title: "Problems",minValue: 0,},
        vAxis: {title: "Solutions",},
        bars: "horizontal",
        axes: {
          y: {
            0: { side: "right" },
          },
        },
      };

    return (
        <div>
            <Header></Header>
            <div className='page_content flex'>
                <div className='navbar'> <Navbar></Navbar></div>
                <div className='content'>
                <section>
                    <div className='flex_inbetween borders space'>
                        <DataCard pic={questions_pic} number={questionsNumber} type={'Asked questions'}></DataCard>
                        <DataCard pic={users_pic} number={usersNumber} type={'Users'}></DataCard>
                        <DataCard pic={problem_pic} number={problemsNumber} type={'Practices'}></DataCard>
                        <DataCard pic={tags_pic} number={tagsNumber} type={'Tags'}></DataCard>
                    </div>
                </section>
                    <div className='flex_inbetween borders'> 
                    <div className='chart small_chart'>  
                        <Chart
                            chartType="PieChart"
                            data={user_types_data}
                            options={user_types_options}
                            width={"100%"}
                            height={"300px"}
                        />
                    </div>
                    <div className='chart small_chart'>
                        <Chart
                            chartType="PieChart"  
                            data={problem_status}
                            options={problem_type_option}
                            width={"100%"}
                            height={"300px"}
                        />
                    </div>
                    </div>
                    <div className='borders'>
                        <div className='chart'>
                            { isHistogramData && (
                                <Chart
                                    chartType="Bar"
                                    width="100%"
                                    height="400px"
                                    data={histogramData}
                                    options={options}
                                />
                            )
                            }
                        </div>
                        <div className='chart'>
                            {isHistogramData2 && (
                                <Chart
                                    chartType="Bar"
                                    width="100%"
                                    height="400px"
                                    data={histogramData2}
                                    options={options2}
                                />
                            )}
                        </div>
                        <div className='chart'>
                        {isHistogramData3 && (
                            <Chart
                                chartType="Bar"
                                width="100%"
                                height="800px"
                                data={histogramData3}
                                options={options3}
                            />
                        )}
                        </div>
                    </div>         
                </div> 
            </div>
            <LowerFooter></LowerFooter>
        </div>
    );
};

export default Dashboard;