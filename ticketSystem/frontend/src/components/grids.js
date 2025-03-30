import React from "react";
import "../styles/eventGrid.css";

const EventGrid = ({ title }) => {
  const events = [
    { id: 1, name: "Event 1", date: "July 20, 2024", location: "New York, NY", image: "event1.jpg" },
    { id: 2, name: "Event 2", date: "August 15, 2024", location: "Los Angeles, CA", image: "event2.jpg" },
    { id: 3, name: "Event 3", date: "September 5, 2024", location: "Seattle, WA", image: "event3.jpg" },
  ];

  return (
    <div className="event-grid">
      <h2>{title}</h2>
      <div className="event-cards">
        {events.map((event) => (
          <div key={event.id} className="event-card" style={{ backgroundImage: `url(${event.image})` }}>
            <div className="event-info">
              <h3>{event.name}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <button>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventGrid;
