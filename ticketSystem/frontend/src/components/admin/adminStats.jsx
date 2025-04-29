import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/adminStats.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57'];

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

  const adminCount = users.filter(u => u.role === "admin").length;
  const normalUserCount = users.filter(u => u.role !== "admin").length;
  const popularEventCount = events.filter(e => e.isPopular).length;
  const upcomingEventCount = events.filter(e => new Date(e.date) > new Date()).length;

  const bookingsByMonth = bookings.reduce((acc, booking) => {
    const month = new Date(booking.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  const bookingsChartData = Object.entries(bookingsByMonth).map(([month, count]) => ({ month, count }));

  const categoryCount = events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});
  const categoryChartData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }));


  const categoryTicketSales = events.reduce((acc, event) => {
    const ticketCount = bookings.filter(booking => booking.eventId === event.id).length;
    acc[event.category] = (acc[event.category] || 0) + ticketCount;
    return acc;
  }, {});
  const categoryTicketSalesData = Object.entries(categoryTicketSales).map(([category, sales]) => ({ category, sales }));

  return (
    <div className="admin-stats-container">
      <h2>📊 Site Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card"><h3>Total Users</h3><p>{users.length}</p></div>
        <div className="stat-card"><h3>Admins</h3><p>{adminCount}</p></div>
        <div className="stat-card"><h3>Normal Users</h3><p>{normalUserCount}</p></div>
        <div className="stat-card"><h3>Total Events</h3><p>{events.length}</p></div>
        <div className="stat-card"><h3>🔥 Popular Events</h3><p>{popularEventCount}</p></div>
        <div className="stat-card"><h3>📅 Upcoming Events</h3><p>{upcomingEventCount}</p></div>
        <div className="stat-card"><h3>🧾 Total Bookings</h3><p>{bookings.length}</p></div>
      </div>

      <div className="charts-section">
        <div className="chart-box">
          <h3>📈 Monthly Booking Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>📂 Event Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryChartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>🎟️ Ticket Sales by Event Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryTicketSalesData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
