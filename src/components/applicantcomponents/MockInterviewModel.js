import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './MockInterviewByAI.css'


const Modal = ({ onClose, onStart }) => {
    const [userData, setUserData] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 755);


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

    return (
        <div className="modal-overlay ">
            <div className="modal-text modalCss">
                <div className="button-container" style={{ position: 'relative' }}>
                    <button
                        type="button"
                        onClick={onClose}
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

                <div className="modal-body ">


                    <h3 style={{ fontSize: '20px', textAlign: 'center', marginBottom: '35px' }}>Instructions</h3>
                    <div
                        className={isMobileView ? 'bg-light p-3 rounded w-100' : ''}
                        style={
                            isMobileView
                                ? {}
                                : {
                                    backgroundColor: '#F9F9F9',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    textAlign: 'left',
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
                            </ol>
                        </div>


                    </div>

                    <div className="resumecard-button">
                        <Link
                            className="button-link1"
                            style={linkStyle}
                            onClick={onStart}
                        >
                            <span className="button button-custom" style={spanStyle}>Start</span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Modal;

