
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/backToHomeFloat.css";

const BackToHome = () => {
  const navigate = useNavigate();
  return (
    <div className="back-to-home" onClick={() => navigate("/")}>
      <FaArrowLeft className="home-icon" />
      Back to Homepage
    </div>
  );
};

export default BackToHome;
