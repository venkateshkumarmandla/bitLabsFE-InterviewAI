import { useState, useEffect, useRef, useCallback } from 'react';
import { useUserContext } from '../common/UserProvider';
import axios from 'axios';
import { apiUrl } from '../../services/ApplicantAPIService';
import { fetchQuestions, analyzeAnswers } from './geminiUtils';
import { Link } from "react-router-dom";
import Taketest from '../../images/user/avatar/Taketest.png';
import { ClipLoader } from "react-spinners"
import { API_KEY } from '../../apikey';
import { BiArrowBack } from "react-icons/bi";
import { FiMic } from 'react-icons/fi';
import { FaKeyboard, FaLessThan } from 'react-icons/fa';
import Modal from './MockInterviewModel'
import Snackbar from '../common/Snackbar';
import javaPNG from '../../images/Icons1/Icons/Java.svg';
import htmlPNG from '../../images/Icons1/Icons/HTML.svg';
import cssPNG from '../../images/Icons1/Icons/CSS.svg';
import mysqlPNG from '../../images/Icons1/Icons/MySQL.svg';
import angularPNG from '../../images/Icons1/Icons/Angular.svg';
import reactPNG from '../../images/Icons1/Icons/React.svg';
import manualTestingPNG from '../../images/Icons1/Icons/Manual Testing.svg';
import sqlPNG from '../../images/Icons1/Icons/SQL.svg';
import jspPNG from '../../images/Icons1/Icons/JSP.svg';
import cPlusPlusPNG from '../../images/Icons1/Icons/CPlusPlus.svg';
import paythonPNG from '../../images/Icons1/Icons/Python.svg';
import regressionPNG from '../../images/Icons1/Icons/Regression Testing.svg';
import hibernatePNG from '../../images/Icons1/Icons/Hibernate.svg';
import netPNG from '../../images/Icons1/Icons/Dot Net.svg';
import servletsPNG from '../../images/Icons1/Icons/Servlets.svg';
import typeScriptPNG from '../../images/Icons1/Icons/TypeScript.svg';
import cSharpPNG from '../../images/Icons1/Icons/C Sharp.svg';
import cPNG from '../../images/Icons1/Icons/C.svg';
import seleniumPNG from '../../images/Icons1/Icons/Selenium.svg';
import javaScriptPNG from '../../images/Icons1/Icons/JavaScript.svg';
import springPNG from '../../images/Icons1/Icons/Spring.svg';
import springBootPNG from '../../images/Icons1/Icons/Spring Boot.svg';
import vuePNG from '../../images/Icons1/Icons/Vue.svg';
import mongodbPNG from '../../images/Icons1/Icons/Mongo DB.svg';
import sqlServerPNG from '../../images/Icons1/Icons/SQL-Server.svg';
import djangoPNG from '../../images/Icons1/Icons/Django.svg';
import flaskPNG from '../../images/Icons1/Icons/Flask.png';




const SkillBadgeCard = ({ skillName }) => {
const skillImages = {
      'JAVA': javaPNG,
      'HTML': htmlPNG,
      'CSS': cssPNG,
      'Python': paythonPNG,
      'MySQL' : mysqlPNG,
      'Angular' : angularPNG,
      'React' : reactPNG,
      'Manual Testing' : manualTestingPNG,
      "SQL" : sqlPNG,
      "JSP" : jspPNG,
      "C++" : cPlusPlusPNG,
      "Regression Testing" : regressionPNG,
      "Hibernate" : hibernatePNG,
      ".Net" : netPNG,
      "Servlets" : servletsPNG,
      "TypeScript" : typeScriptPNG,
      "C Sharp" : cSharpPNG,
      "C" : cPNG,
      "Selenium" : seleniumPNG,
      "JavaScript" : javaScriptPNG,
      "Spring" : springPNG,
      "Spring Boot" : springBootPNG,
      "Vue" : vuePNG,
      "Mongo DB" : mongodbPNG,
      "SQL-Server" : sqlServerPNG,
      "Django" : djangoPNG,
      "Flask" : flaskPNG,
      // Add other skills here...
    };

     const skillImage = skillImages[skillName] || javaPNG;

     return (
    <div className="d-flex flex-column align-items-center border rounded p-3 h-100">
      <img               
                    style={{
                      width: '40%', 
                      height: '40%', 
                      marginRight: '8px' 
                    }}
        src={skillImage}
        alt={skillName}
       
       
      />
      <p className="mt-2 mb-0 text-center">{skillName}</p>
    </div>
  );
}


const MockInterviewByAi = () => {
  const { user } = useUserContext();
  const userId = user.id;
  const [skills, setSkills] = useState([]);
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
  const [micClicked, setMicClicked] = useState(false);
  const [audioStatus, setAudioStatus] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [audioURL, setAudioURL] = useState(null);
  const lastQuestion = 3;
  const [history, setHistory] = useState([]);
  const [sessionId, setSessionId] = useState();
  const [questionNumber, setQuestionNumber] = useState();
  const [transcript, setTranscript] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);
    const peerConnectionRef = useRef(null);
  const streamRef = useRef(null);
const [snackbars, setSnackbars] = useState([]);

  const addSnackbar = (snackbar) => {
    setSnackbars((prevSnackbars) => [...prevSnackbars, snackbar]);
  };
 
  const handleCloseSnackbar = (index) => {
    setSnackbars((prevSnackbars) => prevSnackbars.filter((_, i) => i !== index));
  };
// useEffect(() => {
//   if(isModalOpen){
//       const id = crypto.randomUUID();
//       setSessionId(id);
//     }  
      
//   }, [isModalOpen]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleModal = () => {
    setModalOpen(true);
  }

 useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Setup a dummy peer connection to lock and unlock the stream properly
        peerConnectionRef.current = new RTCPeerConnection();
        stream.getTracks().forEach(track => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        console.log('Webcam started');
      } catch (err) {
        console.error('Error starting webcam:', err);
      }
    };

    const stopVideo = () => {
      const stream = streamRef.current;

      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }

      console.log('Webcam stopped');
    };

    if (questionsShown && !homePage) {
      startVideo();
    } else {
      stopVideo();
    }

    return () => {
      stopVideo();
    };
  }, [questionsShown, homePage]);





  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const speechTranscript = event.results[0][0].transcript;
      console.log(speechTranscript);
      setTranscript(speechTranscript);
      setInputValue(speechTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };

    recognition.start();
  };

  const handleToggleInputMode = () => {
    setInputValue('');
    setMicClicked(prev => !prev);
  };

  const stopAudio = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();

      const stream = mediaRecorderRef.current.stream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        console.log('Microphone access released.');
      } else {
        console.warn('No media stream found to stop.');
      }
      setAudioStatus(false);
    }
  };

  const handleRecording = async () => {
    if (!audioStatus) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunks.current = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
          audioChunks.current.push(e.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
          console.log('Recorded audio blob:', audioBlob);
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);

        };

        mediaRecorderRef.current.start();
        console.log('Recording started...');
        setAudioStatus(true);
        setMicClicked(true);
      } catch (err) {
        console.error('Microphone access denied:', err);
      }
    } else {
      stopAudio();
    }
  };

  const linkStyle = {
    backgroundColor: '#F97316',
    display: 'inline-block',
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 780);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const spanStyle = {
    color: 'white',
    fontFamily: 'Plus Jakarta Sans',
    fontSize: '15px',
    fontWeight: '600',
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
        const updatedHistory = [...history, {skills}];
        setHistory(updatedHistory);
      } catch (error) {
        console.error("Failed to fetch skill badges:", error);
      }
    };
    fetchSkillBadges();
  }, [userId]);

  const handleCodingQuestions = () => {
    window.open("https://www.hackerrank.com/bitlabs-1747748513", "_blank");
  }

  const handleSkillQuestionFetch = useCallback( async(currentValue) => {
    const currentAnswer = currentValue;
    setAnswers(currentAnswer);
    setModalOpen(false);
    setLoading(true);
    setAudioStatus(false);
    setMicClicked();
    try {
      
      const result = await fetchQuestions(skills, API_KEY, history, currentAnswer);
      setHomePage(false);
      setQuestions(result);
      console.log(questions);
      const updatedHistory = [...history, {result, inputValue}];
      console.log(updatedHistory);
      setHistory(updatedHistory);
      console.log(history);
      setInputValue('');
      setLoading(false);
      if(result.completionStatus){
        setAnalysis(result);
          handleSubmit();
      }
    } catch (err) {
      console.error("Failed to load questions", err);
      setQuestions([]);
    }
  }, [history, inputValue]);


  const handleQuestionFetch = async () => {
     setModalOpen(false);
    setLoading(true);
    setAnalysis('');
    try {
      const jwtToken = localStorage.getItem("jwtToken");
console.log(userId);
const payload = {
        applicantId : userId
      };
      const result = await axios.post(`${apiUrl}/api/interview/start`, payload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = result.data;
      console.log(data);
      setQuestions(data);
      setQuestionNumber(data.questionNumber);
      setSessionId(data.sessionId);
      setHomePage(false);
      setLoading(false);
     

    } catch (err) {
      console.error("Failed to load questions", err);
      setQuestions([]);
      handleSubmitAll();
      addSnackbar({ message: 'The test has been submitted since there are no more questions to ask.', type: 'success' });
    
    }

  }

  const handleAdaptiveQuestionFetch = async () => {
    setLoading(true);
    stopAudio();
    setAudioStatus(false);
    setMicClicked(false);
    setAnswers(inputValue);
    console.log(answers);
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const payload = {
        sessionId: sessionId,
        questionNumber: questionNumber,
        answer: inputValue
      };
      console.log(payload);

      const result = await axios.post(`${apiUrl}/api/interview/answer`, payload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = result.data;
      console.log(data);
      setQuestions(data);
      setQuestionNumber(data.questionNumber);
      console.log(questionNumber);
      setSessionId(data.sessionId);
      setHomePage(false);
      setLoading(false);
      setInputValue('');
      if(data.completed){
        
        setAnalysis(data);
        console.log(analysis);
       
        handleSubmitAll();
      addSnackbar({ message: 'The test has been submitted since there are no more questions to ask.', type: 'success' });
        }
      

    } catch (err) {
      console.error("Failed to load questions", err);
      setQuestions([]);
      handleSubmitAll();
      addSnackbar({ message: 'The test has been submitted since there are no more questions to ask.', type: 'success' });
    }
  }

const handleSubmit = async () => {
  setLoading(false);
   setHomePage(false);
  setQuestionsShown(false);
setAnalysisShown(true);
}

  const handleSubmitAll = async () => {
    stopAudio();
    setAudioStatus(false);
    setMicClicked(false);
    setLoading(true);
    setAnswers(inputValue);
    console.log(answers);
    try{
    // const jwtToken = localStorage.getItem("jwtToken");
    // const payload = {
    //   sessionId: sessionId,
    //   questionNumber: questionNumber, 
    //   answer: inputValue
    // };
    // console.log(payload);

    // const result = await axios.post(`${apiUrl}/api/interview/answer`, payload, {
    //   headers: {
    //     Authorization: `Bearer ${jwtToken}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    // const data = result.data;
    // console.log(data);
    // setAnalysis(questions);
    console.log(analysis);
    // setQuestions(data);
    // setQuestionNumber(data.nextQuestionNumber);
    // console.log(questionNumber);
    // setSessionId(data.sessionId);
    setHomePage(false);
      setLoading(false);
      setInputValue('');
    } catch (err) {
      console.error("Failed to load analysis", err);
      setQuestions([]);
    }
    setInputValue('');
    setQuestionsShown(false);
    setAnalysisShown(true);
    setQuestions([]);
  };

  const handleNext = () => {
    stopAudio();
    setAudioStatus(false);
    setMicClicked(false);
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = {
      question: questions[currentIndex].question,
      answer: inputValue
    };
    setAnswers(updatedAnswers);
    setInputValue('');
    setCurrentIndex(currentIndex + 1);
  };

  const handleBackButton = () => {
    setHomePage(true);
    setQuestionsShown(true);
    setAnalysisShown(false);
    setQuestions([]);
    setCurrentIndex(0);
    setInputValue('');
    setAudioStatus(false);
    setMicClicked(false);
    setHistory([]);
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
                        <div className="userName-title" style={{ marginBottom: '10px' }}>
                          Mock Test By AI
                        </div>

                        {/* Coding questions  */}

                        <div className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">
                          <div className="card" style={{ cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>
                            <div className={!isWideScreen ? 'resumecard' : ''}>
                              <div className="resumecard-content" style={{ marginTop: '-10px' }}>
                                <div className="resumecard-text">
                                  <div className="resumecard-heading">
                                    <h2 className="heading1">Coding questions</h2>
                                    <div className="" style={{ fontSize: '16.8px', color: '#6F6F6F', fontWeight: '500', fontFamily: 'Plus Jakarta Sans', fontStyle: 'normal' }}>
                                      Daily preparation is key to success. Start your preparation with Coding questions today.
                                    </div>
                                  </div>
                                  <div className="resumecard-button">
                                    <Link
                                      className="button-link1"
                                      style={linkStyle}
                                      onClick={handleCodingQuestions}

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

                        {/* AI question  */}
                        <div className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">
                          <div className='card' >
                            <div className="row">
                              <div className="resumecard-heading">
                                <h2 className="heading1">AI questions</h2>
                                <div className="" style={{ marginBottom: '5px', fontSize: '16.8px', color: '#6F6F6F', fontWeight: '500', fontFamily: 'Plus Jakarta Sans', fontStyle: 'normal' }}>
                                  Boost your confidence and sharpen your skills—take an AI-powered interview tailored just for your expertise!
                                </div>
                              </div>
                              <div className="skills-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {skills.map((skill, index) => (

                                  <div key={index} >
                                    <div className="skill-but" style={{ backgroundColor: '#498C07', display: 'inline-flex', marginRight: '2px' }}>

                                      {/* <div className="card" style={{ cursor: "pointer" }} onClick={handleQuestionFetch} >   */}

                                      <h4>{skill}</h4>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="resumecard-button">
                                <Link
                                  className="button-link1"
                                  style={linkStyle}
                                  onClick={handleModal}
                                  // onClick={handleQuestionFetch}
                                >
                                  <span className="button button-custom" style={spanStyle}>Start</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

{/* self learning  */}
                        <div className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">
                          <div className='card' >
                            <div className="row">
                              <div className="resumecard-heading">
                                <h2 className="heading1">Skill check</h2>
                                <div className="" style={{ marginBottom: '5px', fontSize: '16.8px', color: '#6F6F6F', fontWeight: '500', fontFamily: 'Plus Jakarta Sans', fontStyle: 'normal' }}>
                                  Get ready to showcase your expertise—your AI-driven assessment based on your selected skill starts now
                                </div>
                              </div>
                              <div className="skills-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {/* {skills.map((skill, index) => (

                                  <div key={index} >
                                    
                                      {/* <div className="card" style={{ cursor: "pointer" }} onClick={handleQuestionFetch} >   

                                      <h4>{skill}</h4>
                                    </div>
                                 
                                ))} */}
                                <div className="container">
  <div className="row">
    {skills.map((skill) => (
      <div
        key={skill}
        className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4"
      >
        <SkillBadgeCard skillName={skill} />
      </div>
    ))}
  </div>
</div>

                              </div>
                              <div className="resumecard-button">
                                <Link
                                  className="button-link1"
                                  style={linkStyle}
                                  // onClick={handleModal}
                                  // onClick={handleQuestionFetch}
                                >
                                  <span className="button button-custom" style={spanStyle}>Start</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {!homePage && questionsShown && (
                      <div className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">
                        {/* Questions generated by AI  */}
                        <div className="card" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>

                          <div className="header">
                            <h3>
                              <span onClick={handleBackButton} style={{ cursor: 'pointer' }}>
                                <BiArrowBack size={24} />
                              </span>
                              <span className="text-name1">AI Mock questions</span>
                              <h4 className='test-sub'>
                                Question 
                              </h4>
                            </h3>
                          </div>
                          <div className="separator"></div>
                          <div style={{ marginBottom: '30px' }}>
                            <div>
                                {/* <h4>{questions[currentIndex].question}</h4>*/}
                            <h4>{questions.questionNumber}. {questions.question} </h4> 
                              {!micClicked ? (
                                <textarea
                                  rows={4}
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                                  placeholder="Type your answer here..."
                                />
                              ) : (<><span onClick={() => { handleRecording(); startSpeechRecognition(); }}><FiMic size={24} color="#333" /></span>
                                {!audioStatus ? <><audio controls src={audioURL} />  {inputValue}</> :
                                  (<span style={{ marginLeft: '10px' }}>Recording...  </span>

                                  )}</>
                              )
                              }
                            </div>
                            <br />
                            <div className="resumecard-button">
                              <span onClick={handleToggleInputMode} style={{ cursor: 'pointer' }}>
                                {micClicked ? <FaKeyboard size={24} color="#333" /> : <FiMic size={24} color="#333" />}
                              </span>
                              <Link className="button-link1" style={linkStyle}
                                // onClick={ handleAdaptiveQuestionFetch}
                                onClick={() => handleSkillQuestionFetch(inputValue)}
                                // questionNumber === lastQuestion ? handleSubmitAll :
                                //  onClick={currentIndex === questions.length - 1 ? handleSubmitAll : handleNext}
                                  // onClick={handleSkillFetch}
                                  >
                                <span className="button button-custom" style={spanStyle}>
                                  {/* {questionNumber === lastQuestion ? 'Submit All' : 'Next'}  */}
                                   {/* {currentIndex === questions.length - 1 ? 'Submit All' : 'Next'}  */}
                                   Evaluate
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
                          <div style={{ marginTop: '30px', whiteSpace: 'pre-wrap', color: 'black' }}>
                            <h4>Analysis Report</h4>
                             {/* <p>Question 1</p> 
                            <p>{analysis.Analysis1}</p><br />
                            <p>Question 2</p>
                            <p>{analysis.Analysis2}</p><br />
                            <p>Question 3</p>
                            <p>{analysis.Analysis3}</p><br /> */}
                            {/* <p>{analysis.feedback}</p><br /> */}
                            <p>Overall Feedback</p>
                            <p>{analysis.overallFeedback}</p><br />
                            {/* <p>Score</p>
                            <p>{analysis.score}</p><br /> */}

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
      {/* {isModalOpen && <Modal onClose={handleCloseModal} onStart={handleQuestionFetch} />} */}
      {isModalOpen && <Modal onClose={handleCloseModal} onStart={handleSkillQuestionFetch} />}
      {!homePage && questionsShown && (
        <div>
          <video
  ref={videoRef}
  autoPlay
  muted
  width="170"
  height="170"
  style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '170px',
    height: '170px',
    border: '2px solid black',
    borderRadius: '50%',
    objectFit: 'cover',
    zIndex: 1000,
    backgroundColor: 'black', // optional: fills background when video is not loaded
  }}
/>

        </div>
      )}
       {snackbars.map((snackbar, index) => (
              <Snackbar
                key={index}
                index={index}
                message={snackbar.message}
                type={snackbar.type}
                onClose={() => handleCloseSnackbar(index)}
              />
            ))}
    </>
  );
};

export default MockInterviewByAi;
