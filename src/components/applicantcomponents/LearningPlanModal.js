// // LearningPlanModal.jsx
// import React from "react";
// import "./AppliedjobsModal.css";
// import LearningPlan from "./LearningPlan"; // assuming your component is in the same folder

// export default function LearningPlanModal({ isOpen, onClose }) {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content p-4 rounded shadow-sm bg-white" style={{ maxWidth: "450px", margin: "auto" }}>
//         <button className="btn btn-sm btn-danger mb-3" onClick={onClose}>
//           Close
//         </button>
//         <LearningPlan />
//       </div>
//     </div>
//   );
// }



import React from "react";
import "./AppliedjobsModal.css";
import LearningPlan from "./LearningPlan";

export default function LearningPlanModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content p-4 rounded shadow-sm bg-white"
        style={{ maxWidth: "450px", margin: "auto" }}
      >
        {/* Removed extra "Close" button */}
        <LearningPlan onClose={onClose} />
      </div>
    </div>
  );
}
