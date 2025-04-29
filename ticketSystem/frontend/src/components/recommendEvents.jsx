import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/recommendEvents.css";
import { useNavigate } from "react-router-dom";

const RecommendedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        const allEvents = res.data?.data || res.data || [];

        const shuffled = allEvents.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setEvents(selected);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleClick = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <div className="recommended-container">
      <h2>Recommended Events</h2>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : events.length === 0 ? (
        <p>No recommended events at this time.</p>
      ) : (
        <div className="recommended-cards">
          {events.map((event) => (
            <div key={event._id} className="event-card">
             
              <div className="event-info">
                <h3>{event.name}</h3>
                <p>{event.date?.slice(0, 10)} — {event.country}</p>
                <button className="view-button" onClick={() => handleClick(event._id)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedEvents;
