import { useState, useEffect, useRef } from 'react';
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
  const [firstQuestion, setFirstQuestion] = useState(true);
  const [sessionId, setSessionId] = useState();
  const [questionNumber, setQuestionNumber] = useState();
  const [transcript, setTranscript] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);
    const peerConnectionRef = useRef(null);
  const streamRef = useRef(null);


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
      } catch (error) {
        console.error("Failed to fetch skill badges:", error);
      }
    };
    fetchSkillBadges();
  }, [userId]);

  const handleCodingQuestions = () => {
    window.open("https://www.hackerrank.com/bitlabs-1747748513", "_blank");
  }

  const handleSkillFetch = async () => {
    setAnswers(inputValue);
    setModalOpen(false);
    setLoading(true);
    setAudioStatus(false);
    setMicClicked();
    try {
      setInputValue('');
      const result = await fetchQuestions(answers, skills, API_KEY);
      setHomePage(false);
      setQuestions(result);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load questions", err);
      setQuestions([]);
    }
  };

  const handleQuestionFetch = async () => {
    setLoading(true);
    setAnalysis('');
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const result = await axios.post(`${apiUrl}/api/interview/start`, userId, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = result.data;
      console.log(data);
      setQuestions(data);
      setQuestionNumber(data.nextQuestionNumber);
      setSessionId(data.sessionId);
      setHomePage(false);
      setLoading(false);
      if (result) setFirstQuestion(false);

    } catch (err) {
      console.error("Failed to load questions", err);
      setQuestions([]);
    }

  }

  const handleAdaptiveQuestionFetch = async () => {
    setAnswers(inputValue);
    console.log(answers);
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const payload = {
        sessionId: sessionId,
        questionNumber: questionNumber,
        answer: answers
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
      setQuestionNumber(data.nextQuestionNumber);
      console.log(questionNumber);
      setSessionId(data.sessionId);
      setHomePage(false);
      setLoading(false);
      setInputValue('');
      if (result) setFirstQuestion(false);

    } catch (err) {
      console.error("Failed to load questions", err);
      setQuestions([]);
    }
  }

  const handleSubmitAll = async () => {
    stopAudio();
    setAudioStatus(false);
    setMicClicked(false);
    // setLoading(true);
    // setAnswers(inputValue);
    // console.log(answers);
    // try{
    // const jwtToken = localStorage.getItem("jwtToken");
    // const payload = {
    //   sessionId: sessionId,
    //   questionNumber: questionNumber, 
    //   answer: answers
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
    // setAnalysis(data);
    // console.log(analysis);
    // setQuestions(data);
    // setQuestionNumber(data.nextQuestionNumber);
    // console.log(questionNumber);
    // setSessionId(data.sessionId);
    // setHomePage(false);
    //   setLoading(false);
    //   setInputValue('');
    // if(result) setFirstQuestion(false);

    // } catch (err) {
    //   console.error("Failed to load analysis", err);
    //   setQuestions([]);
    // }
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

                        {/* skill fetch  */}
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
                              <h4>{questions[currentIndex].question}</h4>
                              {/* <h4> {questions.nextQuestion} </h4> */}
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
                                // {/*onClick={questionNumber === lastQuestion ? handleSubmitAll : handleAdaptiveQuestionFetch}>*/}
                                //  onClick={currentIndex === questions.length - 1 ? handleSubmitAll : handleNext}
                                  onClick={handleSkillFetch}
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
                            {/*  <p>Question 1</p> 
                            <p>{analysis.Analysis1}</p><br />
                            <p>Question 2</p>
                            <p>{analysis.Analysis2}</p><br />
                            <p>Question 3</p>
                            <p>{analysis.Analysis3}</p><br />
                            <p>Overall Feedback</p>
                            <p>{analysis.overallFeedback}</p><br />
                            <p>Score</p>
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
      {isModalOpen && <Modal onClose={handleCloseModal} onStart={handleSkillFetch} className="modelCss" />}
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
    </>
  );
};

export default MockInterviewByAi;
