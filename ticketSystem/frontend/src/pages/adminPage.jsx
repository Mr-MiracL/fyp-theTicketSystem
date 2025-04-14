
import React, { useEffect, useState } from "react";
import EventList from "../components/admin/adminEventList";

import axios from "axios";
import "../styles/adminPage.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(null); // 'events' | 'users' | 'stats'
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    if (activeTab === "events") {
      axios.get("http://localhost:5000/api/events")
        .then((res) => {
          
          setEvents(res.data)})
        
        .catch((err) => console.error("Failed to fetch events:", err));
    }
  }, [activeTab]);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-card-container">
        <div
          className={`admin-card ${activeTab === "events" ? "active" : ""}`}
          onClick={() => setActiveTab("events")}
        >
          <h2>Manage Events</h2>
        </div>
        <div
          className={`admin-card ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          <h2>Manage Users</h2>
        </div>
        <div
          className={`admin-card ${activeTab === "stats" ? "active" : ""}`}
          onClick={() => setActiveTab("stats")}
        >
          <h2>Statistics</h2>
        </div>
      </div>

      {/* 内容区域 */}
      {activeTab === "events" && (
        <div className="admin-section">
          <div className="admin-controls">
          
            <input
              type="text"
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
       
          <EventList
            events={events}
            setEvents={setEvents}
            search={search}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
