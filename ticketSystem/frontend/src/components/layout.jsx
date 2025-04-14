
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/layout.css";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="layout-container">
      <header className="header-bar">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate("/")}>
            ← Back to Homepage
          </button>

          <div className="right-menu">
            
            <a href="/userCenter" className="menu-link">Personal Center</a>
            
            
            <a href="/orderPage" className="menu-link">Order Details</a>
            <a href="/messagePage" className="menu-link">System Messages</a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
