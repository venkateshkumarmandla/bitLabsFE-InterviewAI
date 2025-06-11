import { useState, useEffect, useRef } from 'react';
import { useUserContext } from '../common/UserProvider';
import axios from 'axios';
import { apiUrl } from '../../services/ApplicantAPIService';
import { Link } from "react-router-dom";
import Taketest from '../../images/user/avatar/Taketest.png';
import { ClipLoader } from "react-spinners"
import { BiArrowBack } from "react-icons/bi";
import { FiMic } from 'react-icons/fi';
import { FaKeyboard } from 'react-icons/fa';
import Snackbar from '../common/Snackbar';
import './MockInterviewByAI.css'
import * as faceapi from 'face-api.js';


const MockInterviewByAi = () => {
  const { user } = useUserContext();
  const userId = user.id;
  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
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
  const audioChunksRef = useRef([]);
  const [audioURL, setAudioURL] = useState(null);
  const [history, setHistory] = useState([]);
  const [questionNumber, setQuestionNumber] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const videoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const streamRef = useRef(null);
  const audioStreamRef = useRef(null);
  const [snackbars, setSnackbars] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 755);
  const [cameraAccessible, setCameraAccessible] = useState(false); // NEW STATE
  const [isCameraErrorSubmit, setCameraErrorSubmit] = useState(false);
  const questionRef = useRef(null);
  const [borderColor, setBorderColor] = useState('red');
  const detectionIntervalRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);


  const linkStyle = {
    backgroundColor: '#F97316',
    display: 'inline-block',
  };

  const spanStyle = {
    color: 'white',
    fontFamily: 'Plus Jakarta Sans',
    fontSize: '15px',
    fontWeight: '600',
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const handleResize = () => {
      setIsMobileView(window.innerWidth < 755);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addSnackbar = (snackbar) => {
    setSnackbars((prevSnackbars) => [...prevSnackbars, snackbar]);
  };

  const handleCloseSnackbar = (index) => {
    setSnackbars((prevSnackbars) => prevSnackbars.filter((_, i) => i !== index));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleModal = () => {
    setModalOpen(true);
  }

  useEffect(() => {
    const handleDisable = (e) => {
      if (questionRef.current && questionRef.current.contains(e.target)) {
        e.preventDefault();
      }
    };

    if (questionsShown) {
      document.addEventListener('copy', handleDisable);
      document.addEventListener('paste', handleDisable);
      document.addEventListener('cut', handleDisable);
      document.addEventListener('contextmenu', handleDisable);
    }

    return () => {
      document.removeEventListener('copy', handleDisable);
      document.removeEventListener('paste', handleDisable);
      document.removeEventListener('cut', handleDisable);
      document.removeEventListener('contextmenu', handleDisable);
    };
  }, [questionsShown]);


  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        setCameraAccessible(true);

        if (videoRef.current) {

          videoRef.current.srcObject = stream;
        }

        stream.getVideoTracks().forEach(track => {
          track.onended = () => {
            console.warn('Camera stream ended possible manual stop.');
            setCameraErrorSubmit(true);
            handleSubmit();
            addSnackbar({ message: 'The test has been submitted since there is no video to monitor.', type: 'success' });
          };

          track.onmute = () => {
            console.warn('Camera muted.');
          };

          track.onunmute = () => {
            console.log('Camera unmuted.');
          };
        });

        peerConnectionRef.current = new RTCPeerConnection();
        stream.getTracks().forEach(track => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        console.log('Webcam started');
      } catch (err) {
        setCameraAccessible(false);
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
    }
    else if (isModalOpen) {
      startVideo();
    }
    else {
      setCameraAccessible(false);
      stopVideo();
    }

    return () => {
      stopVideo();
    };
  }, [questionsShown, homePage, isModalOpen]);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // path to models folder in public/
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        console.log('face-api.js models loaded');
        setModelsLoaded(true);
      } catch (err) {
        console.error('Error loading face-api models:', err);
      }
    }

    loadModels();
  }, []);

  const detectFace = async () => {
    if (!videoRef.current || !cameraAccessible) return;

    const detection = await faceapi.detectSingleFace(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );

    if (detection) {
      const confidence = detection.score;
      console.log(`Face detected with confidence: ${confidence.toFixed(2)}`);
      if (confidence >= 0.70) {
        setBorderColor('green');
      }
      else {
        setBorderColor('red');
      }
    } else {
      setBorderColor('red');
    }
  };

  useEffect(() => {
    if (!modelsLoaded || !cameraAccessible || !videoRef.current) return;

    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      console.log('interval cleared');
    }

    // Wait until video is playing
    const checkVideoReady = setInterval(() => {
      if (videoRef.current.readyState === 4) {
        clearInterval(checkVideoReady);
        detectionIntervalRef.current = setInterval(detectFace, 3000);
        console.log('Face detection interval started');
      }
    }, 500);

    return () => {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
      console.log('Detection interval cleaned up');
    };
  }, [modelsLoaded, cameraAccessible]);


  const handleToggleInputMode = () => {
    setInputValue('');
    setMicClicked(prev => !prev);
  };


  const startAudio = async () => {
    try {
      if (audioStatus) {
        stopAudio();
        setAudioStatus(false);
      } else {
        // 1. Start mic stream
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        // 2. Set up recording
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
        };

        mediaRecorder.start();

        setAudioStatus(true);
        console.log('Audio started');
      }
    } catch (error) {
      console.warn('Audio start error:', error);
    }
  };

  const stopAudio = () => {
    console.log('Stopping audio...');
    try {

      const mediaRecorder = mediaRecorderRef.current;
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);

          // Create a File object (optional but helpful for content-type detection)
          const file = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });

          try {
            const jwtToken = localStorage.getItem("jwtToken");
            const response = await axios.post(`${apiUrl}/transcribe`, file, {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'audio/webm',
              },
            });

            console.log('Transcription result:', response.data);
            const audiotext = response.data.results.channels[0].alternatives[0].transcript;
            console.log(audiotext);
            setInputValue(audiotext);
          } catch (err) {
            console.error('Error sending audio to backend:', err);
          }
        };

      }

      const stream = audioStreamRef.current;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
      }
      setAudioStatus(false);
      console.log('Audio stopped');
    } catch (error) {
      console.warn('Audio stop error:', error);
    }
  };


  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 780);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



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
        const updatedHistory = [...history, { skills }];
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


  const handleQuestionFetch = async () => {
    setModalOpen(false);
    setLoading(true);
    setAnalysis('');

    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const lastQA = {
        questionNumber: questionNumber || 0,
        question: questions?.question || null,
        analysis: analysis,
        completionStatus: questions.completionStatus,
        overallFeedback: questions.overallFeedback || null,
        skill: questions.skill || null,
        currentDifficulty: questions.currentDifficulty,
        currentSkillIndex: questions.currentSkillIndex,
        score: questions.score || 0,
        currentSkillQuestionNumber: questions.currentSkillQuestionNumber || null
      };
      const userAnser = {
        currentAnswer: inputValue
      }
      console.log(lastQA);
      let updatedHistory;
      console.log(lastQA.questionNumber);
      if (lastQA.questionNumber !== 0) {
        console.log(30);
        updatedHistory = [...history, lastQA, userAnser];
        console.log(updatedHistory);
      }
      else {
        updatedHistory = [];
      }
      console.log(history);

      // Append last QA to history
      setMicClicked(false);
      setInputValue('');
      setQuestionNumber('');
      const payload = {
        applicantId: userId,
        skills: skills,
        history: updatedHistory
      };
      console.log(payload);
      // Send updated history to backend to get next question
      const result = await axios.post(`${apiUrl}/api/interview/next-question`, payload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = result.data;
      console.log(data);
      console.log(data.question);
      console.log(data.analysis);

      setHistory(updatedHistory);
      console.log(history);

      // Set the new question from response
      setQuestions(data);
      setAnalysis(data.analysis)
      // Update question number
      setQuestionNumber(data.questionNumber);
      // Reset input for next answer
      setInputValue('');
      setHomePage(false);
      setLoading(false);

      if (data.completionStatus) {
        handleSubmit();
        addSnackbar({ message: 'The test has been submitted since there are no more questions to ask.', type: 'success' });
      }

    } catch (err) {
      console.error("Failed to load questions", err);
      setQuestions([]);
      handleSubmit();
      addSnackbar({ message: 'The test has been submitted since there are no more questions to ask.', type: 'success' });
    }
  };

  const handleSubmit = async () => {
    setQuestionNumber('');
    setHistory([]);
    setLoading(false);
    setHomePage(false);
    setQuestionsShown(false);
    setAnalysisShown(true);
  }

  const handleBackButton = () => {
    setQuestionNumber('');
    setAnalysis('');
    setHomePage(true);
    setQuestionsShown(true);
    setAnalysisShown(false);
    setQuestions([]);
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
                      <div ref={questionRef} className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">
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
                              <h4>{questions.questionNumber}. {questions.question} </h4>
                              {!micClicked ? (
                                <textarea
                                  rows={4}
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                                  placeholder="Type your answer here..."
                                />
                              ) : (<><span onClick={startAudio}><FiMic size={24} color="#333" /></span>
                                {!audioStatus ? <><audio controls src={audioURL} />  {inputValue}</> :
                                  (<span style={{ marginLeft: '10px' }}>Recording...  </span>

                                  )}
                              </>
                              )
                              }
                            </div>
                            <br />
                            <div className="resumecard-button">
                              <span onClick={handleToggleInputMode} style={{ cursor: 'pointer' }}>
                                {micClicked ? <FaKeyboard size={24} color="#333" /> : <FiMic size={24} color="#333" />}
                              </span>
                              <Link className="button-link1"
                                style={{ ...spanStyle, opacity: inputValue.trim() ? 1 : 0.5, cursor: inputValue.trim() ? 'pointer' : 'not-allowed' }}
                                onClick={handleQuestionFetch}
                                disabled={!inputValue.trim()}
                              >
                                <span className="button button-custom" style={spanStyle}>
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

                            {isCameraErrorSubmit ? (
                              <p>The test is submitted due to some error</p>
                            ) : (
                              <>
                                <h4>Analysis Report</h4>
                                <p>Overall Feedback</p>
                                <p>{questions.overallFeedback}</p><br />
                                <p>Score</p>
                                <p>{questions.score}</p><br />
                              </>)}
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



      {isModalOpen && (
        <div className="modal-overlay ">
          <div className="modal-text modalCss">
            <div className="button-container" style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={handleCloseModal}
                style={{
                  border: 'none',
                  position: 'absolute',
                  top: '-1px',
                  right: '0px',
                  background: 'transparent',
                  padding: '10px',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M15.5 5L5.5 15" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.5 5L15.5 15" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <h3 style={{ fontSize: '20px', textAlign: 'center', marginBottom: '35px' }}>Instructions</h3>
              <div
                className={isMobileView ? 'bg-light p-3 rounded w-100' : ''}
                style={
                  isMobileView
                    ? { textAlign: 'left' }
                    : {
                      backgroundColor: '#F9F9F9',
                      borderRadius: '10px',
                      padding: '10px',
                      textAlign: 'justify',
                      fontFamily: 'Plus Jakarta Sans',
                      display: 'flex',
                      width: 'auto',
                    }
                }
              >
                <div style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: '#000' }}>
                  <ol>
                    <li>1. This AI-powered test generates each question based on your previous response.</li>
                    <li>2. It evaluates your understanding of the skills you selected during setup.</li>
                    <li>3. Please answer independently without using external help for accurate results.</li>
                    <li>4. After completion, you’ll receive a performance summary with feedback and suggestions.</li>
                    <li>5. The test will automatically submitted when camera access is gone.</li>
                  </ol>
                </div>
              </div>

              <div className="resumecard-button" >
                <Link
                  className="button-link1"
                  style={{
                    ...linkStyle,
                    ...(cameraAccessible
                      ? {}
                      : {
                        background: '#9E9E9E',
                        cursor: 'not-allowed',
                      }),
                  }}
                  onClick={cameraAccessible ? handleQuestionFetch : ''}
                >
                  <span className="button button-custom" style={spanStyle}>Start</span>
                </Link>
                {!cameraAccessible && (
                  <p style={{ color: 'red', fontSize: '13px', marginTop: '5px' }}>
                    Camera access is required to start the test.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}




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
              border: `3px solid ${borderColor}`,
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
