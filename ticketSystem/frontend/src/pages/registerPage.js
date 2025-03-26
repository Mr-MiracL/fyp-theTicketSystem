import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // confirmation
  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      setError(" Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setError(" Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        role,
      });

      // successfully hint
      alert(response.data.message); 
      
      // navigate to loginpage
      navigate("/login");
    } catch (err) {
      
      setError(err.response?.data.message || " Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Create an Account</h2>
        <p className="auth-subtitle">Sign up for a new ticketing system account.</p>
        
        {/* indicate wrong message */}
        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="auth-input">
            <option value="user">Regular User</option>
            <option value="admin">Administrator</option>
          </select>

          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        
        <p className="auth-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
