import React, { useEffect, useState } from 'react';
import './AiModal.css'
 
const Modal = ({ onClose }) => {
  const [userData, setUserData] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 755);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
 
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
    <div className="modal-overlay">
      <div className="modal-text">
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
 
        <div className="modal-body AiModal">
 <div className='heading'>
          <h3>Set your learning plan</h3>
          <h4>Important for focused learning</h4>
 </div>
   
        </div>
      </div>
    </div>
  );
};
 
export default Modal;
 
 