import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", formData); 
      navigate("/login"); // 注册成功跳转到登录页面
    } catch (err) {
      setError(err.response?.data?.message || "registration failed, please try again");
    }
  };

  return (
    <div className="register-container">
      <h2>create account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          required
        />
        <button type="submit">register</button>
      </form>
      {error && <span className="error">{error}</span>}
      <p className="switch-auth">
        already have an account<Link to="/login">login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
