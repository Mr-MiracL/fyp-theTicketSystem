import React, { useContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/layout.css";

const Layout = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);  // 控制弹窗显示
  const navigate = useNavigate();

  // 检查登录状态是否超时
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
    setShowLogoutModal(false);  // 关闭登出弹窗
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
                  <button onClick={handleOpenModal}>登出</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={() => navigate("/login")}>登录</button>
              <button onClick={() => navigate("/register")}>注册</button>
            </div>
          )}
          <nav className="right-links">
            <a href="/userCenter">Personal Center</a>
            <a href="/orderPage">Order Details</a>
            <a href="/messagePage">System Messages</a>
          </nav>
        </div>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      {/* 登出弹窗 */}
      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>确认登出？</h3>
            <div className="logout-modal-actions">
              <button onClick={handleLogout}>确认</button>
              <button onClick={handleCloseModal}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
