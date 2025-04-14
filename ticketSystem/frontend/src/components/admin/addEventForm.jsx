import React, { useState } from "react";
//import "../../styles/addEventForm.css";

const AddEventForm = ({ setEvents, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const newEvent = await response.json();
      setEvents((prev) => [...prev, newEvent]);
      setFormData({ title: "", description: "", date: "", location: "" });
      onClose(); // 提交成功后关闭表单
    } catch (error) {
      console.error("Add event failed:", error);
    }
  };

  return (
    <form className="add-event-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEventForm;
