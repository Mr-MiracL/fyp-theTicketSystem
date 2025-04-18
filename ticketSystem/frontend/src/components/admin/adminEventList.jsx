import React, {  useState } from "react";
import "../../styles/adminEventList.css";

import EditEventModal from "./editEvent";
import AddTicketModal from "./addTicket";
import EditTicketModal from "./editTicket";

const AdminEventList = ({ events, setEvents }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const [showEditTicketModal, setShowEditTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchTicketTypes = async (eventId, callback) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tickets/tickets/${eventId}`);
      const data = await res.json();
      callback(data);
    } catch (err) {
      console.error("Error fetching ticket types:", err);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleDelete = async (eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Delete failed");
      const newEvents = events.filter(event => event._id !== eventId);
      setEvents(newEvents);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleManageTickets = (eventId) => {
    setSelectedEventId(eventId);
    fetchTicketTypes(eventId, setTicketTypes);
  };

  const handleAddTicket = () => {
    setShowAddTicketModal(true);
  };

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowEditTicketModal(true);
  };

  const handleDeleteTicket = async (ticketId, eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Delete failed");
      fetchTicketTypes(selectedEventId, setTicketTypes);
      alert("Ticket deleted.");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete ticket.");
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? event.category === filterCategory : true;
    const matchesDate = filterDate ? new Date(event.date).toISOString().split('T')[0] === filterDate : true;
    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <div className="admin-event-list">
      <h2>Manage Events</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Theater">Theater</option>
          <option value="Conference">Conference</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <ul className="event-list">
        {filteredEvents.map((event) => (
          <li key={event._id} className="event-item">
            <div className="event-info">
              <strong>{event.name}</strong> - {event.date}
            </div>
            <div className="event-actions">
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
              <button onClick={() => handleManageTickets(event._id)}>Manage Tickets</button>
            </div>
          </li>
        ))}
      </ul>

      {selectedEventId && (
        <div className="modal-container">
          <div className="modal-content">
            <h3>Manage Tickets</h3>
            <ul>
              {ticketTypes.map((ticket) => (
                <li key={ticket._id}>
                  <div>
                    <strong>{ticket.ticketType}</strong> - ${ticket.price}
                  </div>
                  <div>Available Tickets: {ticket.availableTickets}</div>
                  <div>Area: {ticket.area}</div>
                  <button onClick={() => handleEditTicket(ticket)}>Edit</button>
                  <button onClick={() => handleDeleteTicket(ticket._id, selectedEventId)}>Delete</button>
                </li>
              ))}
            </ul>
            <button onClick={handleAddTicket}>Add Ticket</button>
            <button onClick={() => setSelectedEventId(null)}>Close</button>
          </div>
        </div>
      )}

      {showEditModal && selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onClose={() => setShowEditModal(false)}
          onEventUpdated={() => window.location.reload()}
        />
      )}

      {showAddTicketModal && selectedEventId && (
        <AddTicketModal
          eventId={selectedEventId}
          onClose={() => setShowAddTicketModal(false)}
          onTicketAdded={() => {
            fetchTicketTypes(selectedEventId, setTicketTypes);
            setShowAddTicketModal(false);
          }}
        />
      )}

      {showEditTicketModal && selectedTicket && (
        <EditTicketModal
          ticket={selectedTicket}
          onClose={() => setShowEditTicketModal(false)}
          onTicketUpdated={() => {
            fetchTicketTypes(selectedEventId, setTicketTypes);
            setShowEditTicketModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminEventList;