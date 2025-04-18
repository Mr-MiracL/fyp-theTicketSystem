import React, { useState } from "react";
import axios from "axios";
import "../../styles/addEventModal.css";

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    country: "",
    image: "",
    category: "Music",
    isPopular: false,
    eventType: "Offline",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onEventAdded(res.data);
      setFormData({
        name: "",
        description: "",
        date: "",
        country: "",
        image: "",
        category: "Music",
        isPopular: false,
        eventType: "Offline",
      });
      setToast("Event added successfully!");
      setTimeout(() => setToast(""), 3000);
      onClose();
    } catch (err) {
      console.error("Add event failed:", err);
      setToast("Failed to add event.");
      setTimeout(() => setToast(""), 3000);
    } finally {
      setLoading(false);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Event</h2>
        <div className="form-group">
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} />
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          <label>Country:</label>
          <input name="country" value={formData.country} onChange={handleChange} />
          <label>Image URL:</label>
          <input name="image" value={formData.image} onChange={handleChange} />
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Theater">Theater</option>
            <option value="Conference">Conference</option>
            <option value="Others">Others</option>
          </select>
          <label>
            <input type="checkbox" name="isPopular" checked={formData.isPopular} onChange={handleChange} />
            Popular Event
          </label>
          <label>Type:</label>
          <select name="eventType" value={formData.eventType} onChange={handleChange}>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <div className="modal-buttons">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Event"}
          </button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
};

export default AddEventModal;
