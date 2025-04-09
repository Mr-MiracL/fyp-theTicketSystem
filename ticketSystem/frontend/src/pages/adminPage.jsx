import React from "react";
import "../styles/admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <h1>admin dashborad</h1>
      <p>welcome, you cab manage events and users here</p>

      <div className="admin-actions">
        <button>check all events</button>
        <button>manage users</button>
        <button>data statistics</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
