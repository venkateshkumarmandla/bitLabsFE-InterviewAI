import React, { useState } from "react";
import { FaUserTie, FaTrophy, FaCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const options = [
  { label: "Prepare for tech interviews", icon: <FaUserTie />, value: "tech" },
  { label: "Learn competitive programming", icon: <FaTrophy />, value: "competitive" },
  { label: "Learn and practise coding", icon: <FaCode />, value: "coding" },
];

export default function LearningPlan() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (selected === "coding") {
      navigate("/mock-interview-by-ai");
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm" style={{ maxWidth: "400px", margin: "auto" }}>
      <h5 className="fw-bold">Set your learning plan</h5>
      <p className="text-muted">Important for focused learning</p>

      {options.map((opt) => (
        <div
          key={opt.value}
          onClick={() => handleSelect(opt.value)}
          className={`d-flex align-items-center border rounded px-3 py-2 mb-2 ${
            selected === opt.value ? "border-primary bg-light" : ""
          }`}
          style={{ cursor: "pointer" }}
        >
          <span className="me-3 fs-4">{opt.icon}</span>
          <span className="flex-grow-1">{opt.label}</span>
          <input
            type="radio"
            checked={selected === opt.value}
            readOnly

            className="form-check-input ms-2"
            style={{  all: 'unset',  }}
          />
        </div>
      ))}

      <div className="d-flex justify-content-between align-items-center mt-4">
        <span className="text-danger fw-semibold">Already setup?</span>
        <button
          className="btn btn-primary"
          disabled={!selected}
          onClick={handleNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
