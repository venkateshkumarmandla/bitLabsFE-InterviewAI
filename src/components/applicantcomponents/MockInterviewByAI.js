// import { useState, useEffect } from 'react';
// import { useUserContext } from '../common/UserProvider';
// import axios from 'axios';
// import { apiUrl } from '../../services/ApplicantAPIService';
// import { fetchQuestionsFromGemini, analyzeAnswers,  calculateAverageScore, analysisText,
//   performAdditionalAnalysis, analyzeGrammarMistakes, assessProgrammingUnderstanding, calculateScore
//  } from './geminiUtils';
// import { Link } from "react-router-dom";
// const MockInterviewByAi = () => {

//   // AIzaSyAsYnprqHafTwJbq8J2QbsbiK1FyR93spk

//   const { user } = useUserContext();
//   const userId = user.id;
//   const [skills, setSkills] = useState([]);
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [inputValue, setInputValue] = useState('');
//   const [analysis, setAnalysis] = useState(null);

//   const linkStyle = {
//     backgroundColor:'#F97316',
//     display: 'inline-block',
//   };

//   const spanStyle = {
//     color: 'white',
//     fontFamily: 'Plus Jakarta Sans',
//     fontSize: '15px',
//     fontWeight: '600',

//   };


//   const handleNext = () => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[currentIndex] = {
//       question: questions[currentIndex].question,
//       answer: inputValue
//     };
//     setAnswers(updatedAnswers);
//     setInputValue('');
//     setCurrentIndex(currentIndex + 1);
//   };


//   const handleSubmitAll = async () => {
//     const updatedAnswers = [...answers];
//     updatedAnswers[currentIndex] = {
//       question: questions[currentIndex].question,
//       answer: inputValue
//     };
//     setAnswers(updatedAnswers);
//     const result = await analyzeAnswers(updatedAnswers); 

//     setAnalysis(result);
//   };

//   useEffect(() => {
//     const fetchSkillBadges = async () => {
//       try {
//         const jwtToken = localStorage.getItem("jwtToken");
//         console.log(jwtToken);
//         console.log(userId);

//         // http://localhost:8081/applicantprofile/1/skills
//         const response = await axios.get(`${apiUrl}/skill-badges/${userId}/skill-badges`, {
//                 // const response = await axios.get(`${apiUrl}/applicantprofile/${userId}/skills`, {

//           headers: { Authorization: `Bearer ${jwtToken}` }
//         });

//         const data = response.data;
//         console.log(data);
//         const names = data.skillsRequired.map(skills => skills.skillName);
//         const names2 = data.applicantSkillBadges.map(skills => skills.skillBadge.name);
//         const combined = [...names, ...names2];
//                 setSkills(combined);

//         // setSkills(data);

//       } catch (error) {
//         console.error("Failed to fetch skill badges:", error);
//       }
//     };
//     fetchSkillBadges();
//   }, [userId]);



//   const handleSkillFetch = async (skill) => {
//     setSelectedSkill(skill);
//     try {
//       const result = await fetchQuestionsFromGemini(skill);

//       setQuestions(result);
//       console.log(result);
//     } catch (err) {
//       console.error("Failed to load questions", err);
//       setQuestions([]);
//     }
//   };


//   return (
//     <div>
//       <div className="dashboard__content">
//         <div className="row mr-0 ml-10">
//           {/* page name  */}
//           <div className="col-lg-12 col-md-12">
//             <div className="page-title-dashboard">
//               <div className="title-dashboard"></div>
//               <div className="userName-title">
//                 Mock Interview By AI
//               </div>
//             </div>
//           </div>

//           {/* container for showing skills  */}

//           <div className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">
//             <div className="card" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>
//               {questions.length == 0  && (
//                 <div className="row">
//                 {skills.map((skill, index) => (
//                   <div
//                     key={index}
//                     className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
//                   >
//                     <div className="card"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => handleSkillFetch(skill)}>

//                       <div className="content">
//                         <span className="title-count">Skill</span>
//                         <h4>{skill}</h4>
//                       </div>
//                     </div>
//                   </div>

//                 ))}
//               </div>

//  )}
// {currentIndex < questions.length  && (
//         <div style={{ marginBottom: '30px' }}>
//           <p> {questions[currentIndex].question}</p>
//           <textarea
//             rows={4}
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
//             placeholder="Type your answer here..."
//           />
//           <br />


//           <div className="resumecard-button">
//   <Link
//     className="button-link1"
//     style={linkStyle}
//     onClick={currentIndex === questions.length - 1 ? handleSubmitAll : handleNext}
//   >
//     <span className="button button-custom" style={spanStyle}>
//       {currentIndex === questions.length - 1 ? 'Submit All' : 'Next'}
//     </span>
//   </Link>
// </div>

//         </div>
//       )}

//       {analysis  && (
//         <div style={{ marginTop: '30px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
//         <h4> Analysis Report</h4>
//         <pre style={{ whiteSpace: 'pre-wrap' }}>{analysis}</pre>


//         <p>
//       <strong style={{ color: '#333' }}>Average Score (Out of 10):</strong>{' '}
//       <span
//         style={{
//           fontWeight: 'bold',
//           color:
//             analysis.averageScore >= 7
//               ? 'green'
//               : analysis.averageScore >= 5
//               ? 'orange'
//               : 'red'
//         }}
//       >
//         {calculateAverageScore}
//         {performAdditionalAnalysis}
//       </span>
//     </p>
//       </div>

//       )}


//           {/* {analysis && (
//   <div
//     style={{
//       marginTop: '30px',
//       padding: '20px',
//       border: '1px solid #ccc',
//       borderRadius: '10px',
//       backgroundColor: '#f9f9f9',
//       fontFamily: 'Arial, sans-serif',
//       lineHeight: '1.6'
//     }}
//   >
//     <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
//       🧠 <strong>Analysis Report</strong>
//     </h3>

//     <p>
//       <strong style={{ color: '#333' }}>Analysis:</strong><br />
//       <span style={{ display: 'block', whiteSpace: 'pre-wrap' }}>{analysis.analysisText}</span>
//     </p>

//     <p>
//       <strong style={{ color: '#333' }}>Grammar Mistakes:</strong>{' '}
//       <span style={{ color: analysis.grammarMistakes > 3 ? 'red' : 'green' }}>
//         {analysis.grammarMistakes}
//       </span>
//     </p>

//     <p>
//       <strong style={{ color: '#333' }}>Programming Understanding Score:</strong>{' '}
//       <span style={{ color: analysis.programmingUnderstandingScore >= 4 ? 'green' : 'orange' }}>
//         {analysis.programmingUnderstandingScore}
//       </span>
//     </p>

//     <p>
//       <strong style={{ color: '#333' }}>Total Score:</strong>{' '}
//       <span
//         style={{
//           fontWeight: 'bold',
//           color:
//             analysis.totalScore >= 7
//               ? 'green'
//               : analysis.totalScore >= 5
//               ? 'orange'
//               : 'red'
//         }}
//       >
//         {analysis.totalScore}
//       </span>
//     </p>

//     <p>
//       <strong style={{ color: '#333' }}>Average Score (Out of 10):</strong>{' '}
//       <span
//         style={{
//           fontWeight: 'bold',
//           color:
//             analysis.averageScore >= 7
//               ? 'green'
//               : analysis.averageScore >= 5
//               ? 'orange'
//               : 'red'
//         }}
//       >
//         {analysis.calculateAverageScore}
//       </span>
//     </p>
//   </div>
// )} */}

//             </div>
//           </div>


//         </div>
//       </div>

//     </div>
//   );
// }

// export default MockInterviewByAi;







import { useState, useEffect } from 'react';
import { useUserContext } from '../common/UserProvider';
import axios from 'axios';
import { apiUrl } from '../../services/ApplicantAPIService';
import { fetchQuestionsFromGemini, analyzeAnswers, fetchAIQuestions, overallScore } from './geminiUtils';
import { Link } from "react-router-dom";
import Taketest from '../../images/user/avatar/Taketest.png';
import { right } from '@popperjs/core';
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
  const [AIQuestions, setAIQuestions] = useState([]);
  const [questionsShown, setQuestionsShown] = useState(false);
  const linkStyle = {
    backgroundColor: '#F97316',
    display: 'inline-block',
  };

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

  const handleSubmitAll = async () => {
    // Save the last answer in the answers array
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = {
      question: questions[currentIndex].question,
      answer: inputValue
    };
    setAnswers(updatedAnswers);

    // Call the analysis function for final results
    try {
      const result = await analyzeAnswers(updatedAnswers);  // Process answers for analysis
      setAnalysis(result);  // Store the analysis results

      // Now, you can send the results to your backend or perform other tasks
      const submitReport = async () => {
        try {
          const jwtToken = localStorage.getItem("jwtToken");
          const response = await axios.post(
            // `http://192.168.203.13:8081/api/test-report/save-or-update`,
            `${apiUrl}/api/test-report/save-or-update`,

            {
              "applicantId": userId,  // Assuming `userId` is the correct applicant ID
              // "score": result.totalScore,  // Total score from analysis result
"score": overallScore,


              "skillName": selectedSkill,  // Use selected skill for the report
            },
            {
              headers: { Authorization: `Bearer ${jwtToken}` }
            }
          );

          console.log("Report submitted successfully:", response.data);
        } catch (error) {
          console.error("Failed to submit report:", error);
        }
      };

      submitReport();  // Submit the results after analyzing answers
    } catch (error) {
      console.error("Error during analysis or report submission:", error);
    }
  };


  useEffect(() => {
    const fetchSkillBadges = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const response = await axios.get(`${apiUrl}/skill-badges/${userId}/skill-badges`, {
          headers: { Authorization: `Bearer ${jwtToken}` }
        });

        const data = response.data;
        const names = data.skillsRequired.map(skills => skills.skillName);
        const names2 = data.applicantSkillBadges.map(skills => skills.skillBadge.name);
        const combined = [...names, ...names2].sort();
        setSkills(combined);
      } catch (error) {
        console.error("Failed to fetch skill badges:", error);
      }
    };
    fetchSkillBadges();
  }, [userId]);

  const handleSkillFetch = async (skill) => {
    setQuestionsShown(true);
    setSelectedSkill(skill);
    try {
      const result = await fetchQuestionsFromGemini(skill);
      setQuestions(result);
    } catch (err) {
      console.error("Failed to load questions", err);
      setQuestions([]);
    }
  };

  const handleAiQuestions = async () => {
    setHomePage(false);
    try {
      const result = await fetchAIQuestions();
      setAIQuestions(result);
    }
    catch (err) {
      console.error("Failed to fetch", err);
    }
  }


  const handleBackButton = () => {
    setHomePage(true);
  }




  return (
    <div>

      <div className="dashboard__content">
        <div className="row mr-0 ml-10">
          <div className="col-lg-12 col-md-12">
            {homePage && (
              <div className="page-title-dashboard">
                <div className="title-dashboard"></div>
                <div className="userName-title">
                  Mock Interview By AI
                </div>
              </div>
            )}

            {/* question bank  */}
            {homePage && !questionsShown && (
              <div className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">
                <div className="card" style={{ cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>
                  <div className={!isWideScreen ? 'resumecard' : ''}>
                    <div className="resumecard-content">
                      <div className="resumecard-text">
                        <div className="resumecard-heading">
                          <h2 className="heading1">AI questions</h2>
                          <div className="" style={{ fontSize: '16.8px', color: '#6F6F6F', fontWeight: '500', fontFamily: 'Plus Jakarta Sans', fontStyle: 'normal' }}>
                            Start your preparation with AI interview questions
                          </div>
                        </div>
                        <div className="resumecard-button">
                          <Link
                            className="button-link1"
                            style={linkStyle}
                            onClick={handleAiQuestions}

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
            )}

            {!homePage && (
              <>
                <div className="page-title-dashboard">
                  <div className="title-dashboard"></div>
                  <div className="userName-title">
                    <span style={
                      { paddingRight: '5px' }
                    } onClick={handleBackButton} className='back_btn'><i class="fa-solid fa-arrow-left"></i></span>
                    Question bank by AI
                  </div>
                </div>
                <div className="row">
                  {AIQuestions.map((qa, index) => (
                    <div
                      key={index}
                      className="col-12 mb-4 card"
                    >
                      <h4>Q{index + 1}: {qa.question}</h4>
                      <p><strong>Answer:</strong> {qa.answer}</p>
                    </div>
                  ))}
                </div>
              </>
            )}


            {homePage && (
              <div className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">
                <div className="card" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>
                  {questions.length === 0 && (
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
                  )}
                  {currentIndex < questions.length && (
                    <div style={{ marginBottom: '30px' }}>
                      <p>{questions[currentIndex].question}</p>
                      <textarea
                        rows={4}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                        placeholder="Type your answer here..."
                      />
                      <br />
                      <div className="resumecard-button">
                        <Link className="button-link1" style={linkStyle} onClick={currentIndex === questions.length - 1 ? handleSubmitAll : handleNext}>
                          <span className="button button-custom" style={spanStyle}>
                            {currentIndex === questions.length - 1 ? 'Submit All' : 'Next'}
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                  {analysis && (
                    <div style={{ marginTop: '30px', whiteSpace: 'pre-wrap' }}>
                      <h4>Analysis Report</h4>
                      <p><strong>Analysis:</strong> {analysis.analysisText}</p>
                      {/* <p><strong>Grammar Mistakes:</strong> {analysis.grammarMistakes}</p>
                      <p><strong>Programming Understanding Score:</strong> {analysis.programmingUnderstandingScore}</p> */}
                      {/* <p><strong>Total Score:</strong> {analysis.totalScore}</p> */}
                      <p><strong>Total Score (Out of 10):</strong> {overallScore}</p>
                      








                    </div>
                  )}


                  {/* 
                  {analysis && (
  <div style={{ marginTop: '30px', whiteSpace: 'pre-wrap' }}>
    <h4>Analysis Report</h4>
    <p><strong>Analysis:</strong> {analysis.analysisText}</p>
    <p><strong>Grammar Mistakes:</strong> {analysis.grammarMistakes}</p>
    <p><strong>Programming Understanding Score:</strong> {analysis.programmingUnderstandingScore}</p>
    <p><strong>Total Score:</strong> {analysis.totalScore}</p>

    {analysis.performAdditionalAnalysis1 ? (
      <>
        <p><strong>Individual Scores:</strong> 
          {Array.isArray(analysis.performAdditionalAnalysis1.individualScores) && analysis.performAdditionalAnalysis1.individualScores.length > 0 
            ? analysis.performAdditionalAnalysis1.individualScores.join(', ') 
            : 'No scores available'}
        </p>
        <p><strong>Average Score:</strong> 
          {analysis.performAdditionalAnalysis1.averageScore !== 'N/A' 
            ? analysis.performAdditionalAnalysis1.averageScore 
            : 'N/A'}
        </p>
      </>
    ) : (
      <p>Analysis data not available yet.</p>
    )}
  </div>
)} */}

                  {/* 
{analysis && (
  <div style={{ marginTop: '30px', whiteSpace: 'pre-wrap' }}>
    <h4>Analysis Report</h4>
    <p><strong>Analysis:</strong> {analysis.analysisText}</p>
    <p><strong>Grammar Mistakes:</strong> {analysis.grammarMistakes}</p>
    <p><strong>Programming Understanding Score:</strong> {analysis.programmingUnderstandingScore}</p>
    <p><strong>Total Score:</strong> {analysis.totalScore}</p>

    {analysis.performAdditionalAnalysis1 ? (
      <>
        <p><strong>Individual Scores:</strong> 
          {Array.isArray(analysis.performAdditionalAnalysis1.individualScores) && analysis.performAdditionalAnalysis1.individualScores.length > 0 
            ? analysis.performAdditionalAnalysis1.individualScores.join(', ') 
            : 'No scores available'}
        </p>
        <p><strong>Average Score:</strong> 
          {analysis.performAdditionalAnalysis1.averageScore !== 'N/A' 
            ? analysis.performAdditionalAnalysis1.averageScore 
            : 'N/A'}
        </p>
      </>
    ) : (
      <p>Analysis data not available yet.</p>
    )}
  </div>
)} */}


                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewByAi;