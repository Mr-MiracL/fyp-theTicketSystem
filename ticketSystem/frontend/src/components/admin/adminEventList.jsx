import React, { useState } from "react";
import "../../styles/adminEventList.css";

const AdminEventList = ({ events, setEvents }) => {
  const [editingEvent, setEditingEvent] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    date: "",
  });

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
      });
      setEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setEditData({
      name: event.name || "",
      date: new Date(event.date).toISOString().split("T")[0],
    });
  };

  const closeEditModal = () => {
    setEditingEvent(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${editingEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editData.name,
          date: editData.date,
        }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to update event");
      }
  
      const updated = await res.json();
  
      // 用新的事件数据替换原有的对应事件
      setEvents((prev) =>
        prev.map((ev) => (ev._id === updated._id ? updated : ev))
      );
  
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update event");
    }
  };
  
  
  return (
    <div className="event-list-container">
      <table className="event-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Country</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.name || "N/A"}</td>
              <td>{event.date ? new Date(event.date).toLocaleDateString() : "N/A"}</td>
              <td>{event.country || "N/A"}</td>
              <td>{event.category || "N/A"}</td>
              <td>
                <button className="edit-btn" onClick={() => openEditModal(event)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(event._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Event</h3>
            <label>
              Title:
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={editData.date}
                onChange={handleChange}
              />
            </label>
            <div className="modal-buttons">
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={closeEditModal} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventList;
