import React, { useContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/layout.css";

const Layout = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);  
  const navigate = useNavigate();

  useEffect(() => {
    const loginTimestamp = localStorage.getItem("loginTimestamp");
    if (loginTimestamp && Date.now() - loginTimestamp > 30 * 60 * 1000) {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setShowDropdown(false);
    setShowLogoutModal(false);  
    navigate("/");
  };

  const handleOpenModal = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="layout-left" onClick={() => navigate("/")}>
          <FaArrowLeft className="home-icon" />
          Back to Homepage
        </div>

        <div className="layout-center">
          {/* 可以放 LOGO */}
        </div>

        <div className="layout-right">
          {user ? (
            <div className="user-info">
              <div className="avatar" onClick={() => setShowDropdown(!showDropdown)}>
                {user.username?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="username" onClick={() => setShowDropdown(!showDropdown)}>
                {user.username}
              </span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={handleOpenModal}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Register</button>
            </div>
          )}
          <nav className="right-links">
          
            <a href="/orderPage">Order Details</a>
            <a href="/messagePage"> Messages</a>
          </nav>
        </div>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

     
      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>Confirm Logout?</h3>
            <div className="logout-modal-actions">
              <button onClick={handleLogout}>Yes</button>
              <button onClick={handleCloseModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
