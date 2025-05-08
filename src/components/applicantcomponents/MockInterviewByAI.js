import { useState, useEffect } from 'react';
import { useUserContext } from '../common/UserProvider';
import axios from 'axios';
import { apiUrl } from '../../services/ApplicantAPIService';
import { fetchQuestionsFromGemini, analyzeAnswers } from './geminiUtils';
import { Link } from "react-router-dom";
const MockInterviewByAi = () => {

  // AIzaSyAsYnprqHafTwJbq8J2QbsbiK1FyR93spk

  const { user } = useUserContext();
  const userId = user.id;
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [analysis, setAnalysis] = useState(null);
 
  const linkStyle = {
    backgroundColor:'#F97316',
    display: 'inline-block',
  };

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
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = {
      question: questions[currentIndex].question,
      answer: inputValue
    };
    setAnswers(updatedAnswers);
    const result = await analyzeAnswers(updatedAnswers); 
   
    setAnalysis(result);
  };

  useEffect(() => {
    const fetchSkillBadges = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        console.log(jwtToken);
        console.log(userId);
        const response = await axios.get(`${apiUrl}/skill-badges/${userId}/skill-badges`, {
          headers: { Authorization: `Bearer ${jwtToken}` }
        });

        const data = response.data;
        console.log(data);
        const names = data.skillsRequired.map(skills => skills.skillName);
        const names2 = data.applicantSkillBadges.map(skills => skills.skillBadge.name);
        const combined = [...names, ...names2];
        setSkills(combined);

      } catch (error) {
        console.error("Failed to fetch skill badges:", error);
      }
    };
    fetchSkillBadges();
  }, [userId]);



  const handleSkillFetch = async (skill) => {
    setSelectedSkill(skill);
    try {
      const result = await fetchQuestionsFromGemini(skill);
     
      setQuestions(result);
      console.log(result);
    } catch (err) {
      console.error("Failed to load questions", err);
      setQuestions([]);
    }
  };


  return (
    <div>
      <div className="dashboard__content">
        <div className="row mr-0 ml-10">
          {/* page name  */}
          <div className="col-lg-12 col-md-12">
            <div className="page-title-dashboard">
              <div className="title-dashboard"></div>
              <div className="userName-title">
                Mock Interview By AI
              </div>
            </div>
          </div>

          {/* container for showing skills  */}

          <div className="col-12 col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 display-flex certificatebox">
            <div className="card" style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>
              {questions.length == 0  && (
                <div className="row">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <div className="card"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSkillFetch(skill)}>

                      <div className="content">
                        <span className="title-count">Skill</span>
                        <h4>{skill}</h4>
                      </div>
                    </div>
                  </div>

                ))}
              </div>

 )}
{currentIndex < questions.length  && (
        <div style={{ marginBottom: '30px' }}>
          <p> {questions[currentIndex].question}</p>
          <textarea
            rows={4}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
            placeholder="Type your answer here..."
          />
          <br />

          
          <div className="resumecard-button">
  <Link
    className="button-link1"
    style={linkStyle}
    onClick={currentIndex === questions.length - 1 ? handleSubmitAll : handleNext}
  >
    <span className="button button-custom" style={spanStyle}>
      {currentIndex === questions.length - 1 ? 'Submit All' : 'Next'}
    </span>
  </Link>
</div>

        </div>
      )}

      {analysis  && (
        <div style={{ marginTop: '30px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
        <h4> Analysis Report</h4>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{analysis}</pre>
      </div>
      
      )}

            </div>
          </div>


        </div>
      </div>

    </div>
  );
}

export default MockInterviewByAi;