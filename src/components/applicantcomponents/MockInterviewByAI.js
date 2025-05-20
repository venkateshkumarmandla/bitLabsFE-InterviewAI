import { useState, useEffect } from 'react';
import { useUserContext } from '../common/UserProvider';
import axios from 'axios';
import { apiUrl } from '../../services/ApplicantAPIService';
import { fetchQuestions, analyzeAnswers } from './geminiUtils';
import { Link } from "react-router-dom";
import Taketest from '../../images/user/avatar/Taketest.png';
import { ClipLoader } from "react-spinners"
import { API_KEY } from '../../apikey';
const MockInterviewByAi = () => {
  const { user } = useUserContext();
  const userId = user.id;
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [homePage, setHomePage] = useState(true);
  const [questionsShown, setQuestionsShown] = useState(true);
  const [analysisShown, setAnalysisShown] = useState(false);
  const [loading, setLoading] = useState(true);

  const linkStyle = {
    backgroundColor: '#F97316',
    display: 'inline-block',
  };

  //  Gemini api
  // const API_KEY = 'AIzaSyAsYnprqHafTwJbq8J2QbsbiK1FyR93spk';


  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 780);
    };

    // Initialize the state on component mount
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const spanStyle = {
    color: 'white',
    fontFamily: 'Plus Jakarta Sans',
    fontSize: '15px',
    fontWeight: '600',
  };

  const handleNext = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = {
      question: questions[currentIndex].question,
      answer: inputValue
    };
    setAnswers(updatedAnswers);
    setInputValue('');
    setCurrentIndex(currentIndex + 1);
  };


  //   const handleSubmittion = async(score) => {
  //      try {
  //   const jwtToken = localStorage.getItem("jwtToken");
  //   console.log(score);
  //   const payload = {
  //     applicantId: userId,
  //     skill: selectedSkill, 
  //     score: score
  //   };

  //   await axios.post(`${apiUrl}/api/test-report/save-or-update`, payload, {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //       'Content-Type': 'application/json'
  //     }
  //   });

  //   console.log("Result submitted successfully.");

  // } catch (error) {
  //   console.error("Submission failed:", error);
  // }
  //   };

  // useEffect(() => {
  //   handleSubmittion(overallScore);
  // }, [overallScore]);

  const handleSubmitAll = async () => {
    setLoading(true);
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = {
      question: questions[currentIndex].question,
      answer: inputValue
    };
    setAnswers(updatedAnswers);
    const result = await analyzeAnswers(updatedAnswers, API_KEY);
    setAnalysis(result);
    if (result) setLoading(false);
    setInputValue('');
    setQuestionsShown(false);
    setAnalysisShown(true);
    setQuestions([]);
  };



  useEffect(() => {
    setLoading(true);
    const fetchSkillBadges = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        // const response = await axios.get(`${apiUrl}/applicantprofile/${userId}/skills`, {
        const response = await axios.get(`${apiUrl}/skill-badges/${user.id}/skill-badges`, {
          headers: { Authorization: `Bearer ${jwtToken}` }
        });
       
        const data = response.data;
        const names = data.skillsRequired.map(skills => skills.skillName);
        const names2 = data.applicantSkillBadges.map(skills => skills.skillBadge.name);
        const combined = [...names, ...names2].sort();
        setSkills(combined);
        if (skills)
          setLoading(false);
      } catch (error) {
        console.error("Failed to fetch skill badges:", error);
      }
    };
    fetchSkillBadges();
  }, [userId]);

  const handleSkillFetch = async (skill) => {
    setLoading(true);
    setSelectedSkill(skill);
    try {
      const result = await fetchQuestions(skill, API_KEY);
      setHomePage(false);
      setQuestions(result);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load questions", err);
      setQuestions([]);
    }
  };

  // const handleAiQuestions = async () => {
  //   setHomePage(false);
  //   try {
  //     const result = await fetchAIQuestions(API_KEY);
  //     setAIQuestions(result);
  //   }
  //   catch (err) {
  //     console.error("Failed to fetch", err);
  //   }
  // }


  const handleBackButton = () => {
    setHomePage(true);
    setQuestionsShown(true);
    setAnalysisShown(false);
    setQuestions([]);
    setCurrentIndex(0);
  }


  return (
    <>
      {loading ? <div className="spinner-container">
        <ClipLoader color="#0d6efd" loading={loading} size={50} />
      </div> : (
        <div className="dashboard__content">
          <div className="row mr-0 ml-10">
            <div className="col-lg-12 col-md-12">
              <div className="page-title-dashboard">

                <div className="col-lg-12 col-md-12">
                  <div className="row dash-count">
                    {homePage && (
                      <>
                        {/* //  page title  */}
                        <div className="title-dashboard"></div>
                        <div className="userName-title">
                          Mock Interview By AI
                        </div>


                        {/* AI question bank  */}
                        <div className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">

                          <div className="card" style={{ cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>
                            <div className={!isWideScreen ? 'resumecard' : ''}>
                              <div className="resumecard-content">
                                <div className="resumecard-text">
                                  <div className="resumecard-heading">
                                    <h2 className="heading1">AI questions</h2>
                                    <div className="" style={{ fontSize: '16.8px', color: '#6F6F6F', fontWeight: '500', fontFamily: 'Plus Jakarta Sans', fontStyle: 'normal' }}>
                                      Daily preparation is key to success. Start your preparation with AI interview questions today.
                                    </div>
                                  </div>
                                  <div className="resumecard-button">
                                    <Link
                                      className="button-link1"
                                      style={linkStyle}
                                    // onClick={handleAiQuestions}

                                    >
                                      <span className="button button-custom" style={spanStyle}>prepare</span>
                                    </Link>
                                  </div>
                                </div>

                                <div className="resumecard-icon" style={{ marginLeft: 'auto' }}>
                                  <img
                                    src={Taketest}
                                    alt="Taketest"
                                    style={{ width: '160px', height: 'auto', objectFit: 'contain', marginTop: '10px' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        {/* skill fetch  */}
                        <div className="row">
                          {skills.map((skill, index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                              <div className="card" style={{ cursor: "pointer" }} onClick={() => handleSkillFetch(skill)}>
                                <div className="content">
                                  <span className="title-count">Skill</span>
                                  <h4>{skill}</h4>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>


                      </>
                    )}
                    {!homePage && questionsShown && (
                      <div className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">
                        {/* Questions generated by AI  */}

                        <div className="card" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>

                          <div className="header">
                            <h3>
                              <span className="text-name1">AI Mock questions</span>
                              <h4 className='test-sub'>
                                Question {currentIndex + 1} / {questions.length}
                              </h4>
                            </h3>
                          </div>
                          <div className="separator"></div>
                          <div style={{ marginBottom: '30px' }}>
                            <h4>{currentIndex + 1}. {questions[currentIndex].question}</h4>
                            <textarea
                              rows={4}
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                              placeholder="Type your answer here..."
                            />
                            <br />
                            <div className="resumecard-button">
                              <Link className="button-link1" style={linkStyle}
                                onClick={currentIndex === questions.length - 1 ? handleSubmitAll : handleNext}>
                                <span className="button button-custom" style={spanStyle}>
                                  {currentIndex === questions.length - 1 ? 'Submit All' : 'Next'}
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                    {!homePage && analysisShown && !questionsShown && (
                      <div className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">
                        {/* analysis reposrt  */}

                        <div className="card" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>
                          <div style={{ marginTop: '30px', whiteSpace: 'pre-wrap' }}>
                            <h4>Analysis Report</h4>
                            <p>{analysis}</p>

                          </div>
                          <div className="resumecard-button">
                            <Link
                              className="button-link1"
                              style={linkStyle}
                              onClick={handleBackButton}

                            >
                              <span className="button button-custom" style={spanStyle}>Back</span>
                            </Link>
                          </div>
                        </div>

                      </div>
                    )}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  );
};

export default MockInterviewByAi;