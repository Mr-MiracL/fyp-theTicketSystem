import React, { useState } from "react";
import "../../styles/adminEventList.css";

const EditEventModal = ({ event, onClose, onEventUpdated }) => {
  const [formData, setFormData] = useState({
    name: event.name || "",
    description: event.description || "",
    date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
    country: event.country || "",
    category: event.category || "Music",
    isPopular: event.isPopular || false,
    eventType: event.eventType || "Offline",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({ ...prev, isPopular: !prev.isPopular }));
  };

  const handleUpdate = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      const res = await fetch(`http://localhost:5000/api/events/${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedEvent = await res.json();
      alert("Event updated.");
      onEventUpdated(updatedEvent);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update event.");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h3>Edit Event</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Event Name:
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Date:
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Country:
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </label>
          <label>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Theater">Theater</option>
              <option value="Conference">Conference</option>
              <option value="Others">Others</option>
            </select>
          </label>
          <label>
            Is Popular:
            <input
              type="checkbox"
              checked={formData.isPopular}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            Event Type:
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="button" onClick={handleUpdate}>Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
