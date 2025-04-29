import React, { useEffect, useState } from "react";
import EventList from "../components/admin/adminEventList";
import UserList from "../components/admin/adminUserList";
import AddEventModal from "../components/admin/addEvent";
import AdminStats from "../components/admin/adminStats";
import axios from "axios";
import "../styles/adminPage.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (activeTab === "events") {
      fetchEvents();
    }
  }, [activeTab]);

  const fetchEvents = () => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => {
        setEvents(res.data);
        setFilteredEvents(res.data);
      })
      .catch((err) => console.error("Failed to fetch events:", err));
  };

  const handleAddEvent = () => {
    setShowAddModal(true);
  };

  const handleEventAdded = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
  };

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

    
      {activeTab === "events" && (
        <div className="admin-section">
          <div className="admin-controls">
            <button className="add-event-btn" onClick={handleAddEvent}>
              Add Event
            </button>
          </div>

          <EventList events={filteredEvents} setEvents={setEvents} />

          <AddEventModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onEventAdded={handleEventAdded}
          />
        </div>
      )}

   
      {activeTab === "users" && <UserList />}

      {activeTab === "stats" && <AdminStats />}
    </div>
  );
};

export default AdminDashboard;
