import React, { useEffect, useState } from "react";
import axios from "axios";
import "./popularGrid.css"; 

const PopularEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events/popular")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="popular-events-container">
      <h2>Popular Events</h2>
      <div className="event-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.name}</h3>
            <p>{new Date(event.date).toDateString()} | {event.country}</p>
            <p><strong className="price">${event.ticketPrice}</strong></p>
            <p>Available Tickets: <span className="tickets">{event.availableTickets}</span></p>
            <p>Discount: <span className="discount">{event.discount}%</span></p>
            <button className="book-btn">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularEvents;
