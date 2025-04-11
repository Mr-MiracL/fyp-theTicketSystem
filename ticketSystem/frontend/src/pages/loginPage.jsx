import React, { useState, useContext } from "react";
import axios from "axios";
import {AuthContext} from "../context/authContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_STATE" });

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

     
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || { message: "登录失败" } });
    }
  };


  return (
    <div className="login-container">
      <h2>user login</h2>
      <input type="text" id="username" placeholder="username" onChange={handleChange} />
      <input type="password" id="password" placeholder="password" onChange={handleChange} />
      <p className="switch-auth">
  No account yet?<Link to="/register">register</Link></p>

      <button disabled={loading} onClick={handleClick}>login</button>
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};

export default LoginPage;
