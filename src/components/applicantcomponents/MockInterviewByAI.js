import { useState, useEffect } from 'react';
import { useUserContext } from '../common/UserProvider';
import axios from 'axios';
import { apiUrl } from '../../services/ApplicantAPIService';
const MockInterviewByAi = () => {

    const { user } = useUserContext();
    const userId = user.id;
    const [skillBadges, setSkillBadges] = useState([]);

    useEffect(() => {
        const fetchSkillBadges = async () => {
            try {
                const jwtToken = localStorage.getItem("jwtToken");
                console.log(jwtToken);
                console.log(userId);
                const response = await axios.get(`${apiUrl}/skill-badges/${userId}/skill-badges`, {
                    headers: { Authorization: `Bearer ${jwtToken}` }
                });
                setSkillBadges(response.data);
            } catch (error) {
                console.error("Failed to fetch skill badges:", error);
            }
        };
        fetchSkillBadges();
    }, [userId]);

    useEffect( () => {
        console.log(skillBadges);
    }, [skillBadges]);

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
                    <div className="card" style={{ cursor: 'pointer', backgroundColor: '#FFF', fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>
                      {/* <div className={!isWideScreen ? 'resumecard' : ''}>
                        <div className="resumecard-content">
                          <div className="resumecard-text">
                            <div className="resumecard-heading">
                              <h2 className="heading1">Earn Pre-Screened Badges
                               
                              </h2>
                              <div className="" style={{ fontSize: '16.8px', color: '#6F6F6F', fontWeight: '500', fontFamily: 'Plus Jakarta Sans', fontStyle: 'normal' }}>
                                Achieve your dream job faster by demonstrating your aptitude and technical skills.
                              </div>
                            </div>
                            <div className="resumecard-button">
                              <Link
                                to="/applicant-verified-badges"
                                className="button-link1"
                                style={linkStyle}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                              >
                                <span className="button button-custom" style={spanStyle}>Take Test</span>
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
                      </div> */}

                    </div>
                  </div>
             

                </div>
            </div>
       
        </div>
    );
}

export default MockInterviewByAi;