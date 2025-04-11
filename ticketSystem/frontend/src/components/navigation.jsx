import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/navigation.css";

const Navigation = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav className="nav-container">
      <div className="nav-logo" onClick={() => navigate("/")}>
        🎫 Eventify
      </div>

      <div className="nav-actions">
        {user ? (
          <div className="user-info">
            <div
              className="avatar"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.username?.[0]?.toUpperCase() || "U"}
            </div>
            <span
              className="username"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.username}
            </span>

            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>登出</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={() => navigate("/login")}>登录</button>
            <button onClick={() => navigate("/register")}>注册</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
