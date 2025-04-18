import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "../styles/popularGrid.css"; 

const PopularEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();  

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events/popular")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);


  const handleViewEventDetail = (id) => {
    navigate(`events/${id}`); 
  };

  return (
    <div className="popular-events-container">
      <h2>Popular Events</h2>
      <div className="event-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.name}</h3>
            <p>{new Date(event.date).toDateString()} | {event.country}</p>
           
            <button className="book-btn" onClick={() => handleViewEventDetail(event._id)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularEvents;
