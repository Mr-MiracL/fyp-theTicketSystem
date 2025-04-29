import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/adminStats.css"

const AdminStats = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const [userRes, eventRes, bookingRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/events", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/tickets", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(userRes.data);
        setEvents(eventRes.data);
        setBookings(bookingRes.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchData();
  }, []);

  // 示例统计逻辑（也可以统计分类分布等）
  const adminCount = users.filter(u => u.role === "admin").length;
  const normalUserCount = users.filter(u => u.role !== "admin").length;

  const popularEventCount = events.filter(e => e.isPopular).length;
  const upcomingEventCount = events.filter(e => new Date(e.date) > new Date()).length;

  return (
    <div className="admin-stats-container">
      <h2>📊 Site Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3> Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h3> Admins</h3>
          <p>{adminCount}</p>
        </div>
        <div className="stat-card">
          <h3> Normal Users</h3>
          <p>{normalUserCount}</p>
        </div>
        <div className="stat-card">
          <h3> Total Events</h3>
          <p>{events.length}</p>
        </div>
        <div className="stat-card">
          <h3>🔥 Popular Events</h3>
          <p>{popularEventCount}</p>
        </div>
        <div className="stat-card">
          <h3>📅 Upcoming Events</h3>
          <p>{upcomingEventCount}</p>
        </div>
        <div className="stat-card">
          <h3>🧾 Total Bookings</h3>
          <p>{bookings.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
