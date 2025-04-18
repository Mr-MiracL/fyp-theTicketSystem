import React, { useState } from "react";
import "../../styles/addTicketModal.css";

const AddTicketModal = ({ eventId, onClose, onTicketAdded }) => {
  const [formData, setFormData] = useState({
    ticketType: "",  
    price: "",
    area: "",
    availableTickets: "",  
    status: "", 
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

   
    if (formData.ticketType === "VIP" && formData.price < 100) {
      setToast("The price for a VIP ticket must be at least 100.");
      setTimeout(() => setToast(""), 3000);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/tickets/${eventId}`, {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to add ticket.");
      }

      const newTicket = await res.json();
      onTicketAdded(newTicket);

      setToast("Ticket added successfully!");
      setFormData({
        ticketType: "",  
        price: "",
        area: "",
        availableTickets: "",  
        status: "",  
      });
      setTimeout(() => setToast(""), 3000);
      onClose();
    } catch (err) {
      console.error(err);
      setToast("Failed to add ticket.");
      setTimeout(() => setToast(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h3>Add New Ticket</h3>
        <input
          name="ticketType"
          placeholder="Enter ticket type (Regular/VIP)"
          value={formData.ticketType}
          onChange={handleChange}
          list="ticketTypes"
        />
        <datalist id="ticketTypes">
          <option value="Regular" />
          <option value="VIP" />
        </datalist>
        <input
          name="price"
          placeholder="Enter price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          name="area"
          placeholder="Enter area"
          value={formData.area}
          onChange={handleChange}
        />
        <input
          name="availableTickets"
          placeholder="Enter available tickets"
          type="number"
          value={formData.availableTickets}
          onChange={handleChange}
        />
        <input
          name="status"
          placeholder="Enter status (available, sold, cancelled)"
          value={formData.status}
          onChange={handleChange}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Ticket"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
};

export default AddTicketModal;
