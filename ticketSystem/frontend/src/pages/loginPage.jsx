import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_STATE" });
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
  
      // ✅ 从 res.data 解构
      const { user, token } = res.data;
  
      if (!user || !user.role || !token) {
        throw new Error("Login response missing required fields.");
      }
  
      dispatch({ type: "LOGIN_SUCCESS", payload: { ...user, token } });
  
      toast.success(`Welcome back, ${user.username}!`);
  
      if (user.role.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
  
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data || { message: "登录失败，请检查用户名和密码" },
      });
    }
  };
  
  
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleClick}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>Login</button>
        {error && <p className="error">{error.message}</p>}
        <p className="switch-auth">
          No account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
