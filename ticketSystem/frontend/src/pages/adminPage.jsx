import React, { useEffect, useState } from "react";
import EventList from "../components/admin/adminEventList";
import UserList from "../components/admin/adminUserList";
import axios from "axios";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // 'events' | 'users' | null

  useEffect(() => {
    axios.get("http://localhost:5000/api/events").then((res) => setEvents(res.data));
    axios.get("http://localhost:5000/api/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome, you can manage events and users here</p>

      {/* 卡片式模块入口 */}
      <div className="admin-card-container">
        <div
          className={`admin-card ${activeTab === "events" ? "active" : ""}`}
          onClick={() => setActiveTab("events")}
        >
          <h2>Event Management</h2>
          <p>Click to manage events</p>
        </div>

        <div
          className={`admin-card ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          <h2>User Management</h2>
          <p>Click to manage users</p>
        </div>
      </div>

      {/* 内容区域：点击后显示对应部分 */}
      <div className="admin-section">
        {activeTab === "events" && <EventList events={events} setEvents={setEvents} />}
        {activeTab === "users" && <UserList users={users} setUsers={setUsers} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
