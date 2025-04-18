import React, { useState } from "react";
import "../../styles/adminEventList.css";

const EditTicketModal = ({ ticket, onClose, onTicketUpdated }) => {
  const [formData, setFormData] = useState({
    ticketType: ticket.ticketType || "", 
    price: ticket.price || "",
    area: ticket.area || "",
    availableTickets: ticket.availableTickets || "",
    status: ticket.status || "available", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
   
    if (formData.ticketType === "VIP" && formData.price < 100) {
      alert("The price for a VIP ticket must be at least 100.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      const res = await fetch(`http://localhost:5000/api/tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");
      alert("Ticket updated.");
      onTicketUpdated();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update ticket.");
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h3>Edit Ticket</h3>
        <label>
          Ticket Type:
          <input
            name="ticketType"
            value={formData.ticketType}
            onChange={handleChange}
            list="ticketTypes"
            placeholder="Enter ticket type"
          />
          <datalist id="ticketTypes">
            <option value="Regular" />
            <option value="VIP" />
          </datalist>
        </label>
        <label>
          Price:
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </label>
        <label>
          Area:
          <input
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter area"
          />
        </label>
        <label>
          Available Tickets:
          <input
            name="availableTickets"
            type="number"
            value={formData.availableTickets}
            onChange={handleChange}
            placeholder="Enter available tickets"
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Select ticket status"
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <div className="modal-actions">
          <button onClick={handleUpdate}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTicketModal;
