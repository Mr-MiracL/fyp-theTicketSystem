import React, { useState } from "react";
import "../../styles/adminEventList.css";

const AdminEventList = ({ events, setEvents }) => {
  const [editingEvent, setEditingEvent] = useState(null);
  const [editData, setEditData] = useState({});

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
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      description: event.description || "",
      country: event.country || "",
      ticketPrice: event.ticketPrice || 0,
      availableTickets: event.availableTickets || 0,
      discount: event.discount || 0,
      image: event.image || "",
      category: event.category || "",
      status: event.status || "Upcoming",
      isPopular: event.isPopular || false,
      eventType: event.eventType || "Offline",
    });
  };

  const closeEditModal = () => {
    setEditingEvent(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${editingEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) {
        throw new Error("Failed to update event");
      }

      const updated = await res.json();
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
            <label>Title:<input name="name" value={editData.name} onChange={handleChange} /></label>
            <label>Description:<textarea name="description" value={editData.description} onChange={handleChange} /></label>
            <label>Date:<input type="date" name="date" value={editData.date} onChange={handleChange} /></label>
            <label>Country:<input name="country" value={editData.country} onChange={handleChange} /></label>
            <label>Ticket Price:<input type="number" name="ticketPrice" value={editData.ticketPrice} onChange={handleChange} /></label>
            <label>Available Tickets:<input type="number" name="availableTickets" value={editData.availableTickets} onChange={handleChange} /></label>
            <label>Discount:<input type="number" name="discount" value={editData.discount} onChange={handleChange} /></label>
            <label>Image URL:<input name="image" value={editData.image} onChange={handleChange} /></label>
            <label>Category:
              <select name="category" value={editData.category} onChange={handleChange}>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Theater">Theater</option>
                <option value="Conference">Conference</option>
                <option value="Others">Others</option>
              </select>
            </label>
            <label>Status:
              <select name="status" value={editData.status} onChange={handleChange}>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </label>
            <label>Is Popular:
              <input type="checkbox" name="isPopular" checked={editData.isPopular} onChange={handleChange} />
            </label>
            <label>Event Type:
              <select name="eventType" value={editData.eventType} onChange={handleChange}>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </label>
            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventList;
