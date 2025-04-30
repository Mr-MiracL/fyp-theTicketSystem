import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/searchBar.css";

const SearchResults = () => {
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [keyword, setKeyword] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchAllEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchCountry = country ? event.country === country : true;
    const matchKeyword = keyword
      ? event.name.toLowerCase().includes(keyword.toLowerCase())
      : true;

    const eventDate = new Date(event.date);
    const matchStartDate = dates.startDate
      ? eventDate >= new Date(dates.startDate)
      : true;
    const matchEndDate = dates.endDate
      ? eventDate <= new Date(dates.endDate)
      : true;

    return matchCountry && matchKeyword && matchStartDate && matchEndDate;
  });

  return (
    <div
      className="search-results-container"
      style={{
        background: "linear-gradient(to right, #f0f2f5, #e0e7ff)",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      <div className="search-bar-container" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "24px", marginBottom: "1rem" }}>
          Search Events
        </h3>
        <div
          className="search-bar"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <select
            className="select-dropdown"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Choose country</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
          </select>

          <input
            type="date"
            className="date-picker"
            value={dates.startDate}
            onChange={(e) =>
              setDates((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />

          <input
            type="date"
            className="date-picker"
            value={dates.endDate}
            onChange={(e) =>
              setDates((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />

          <input
            type="text"
            className="keyword-input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
          />
        </div>
      </div>

      <h2 style={{ fontSize: "28px", marginBottom: "1rem" }}>Search Results</h2>
      <div
        className="event-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <motion.div
              key={event._id}
              className="event-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "1.5rem",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease",
              }}
              whileHover={{ scale: 1.03 }}
            >
              <h3 style={{ fontSize: "20px", marginBottom: "0.5rem" }}>
                {event.name}
              </h3>
              <p style={{ color: "#555" }}>
                {new Date(event.date).toDateString()} | {event.country}
              </p>

              <button
                className="book-btn"
                onClick={() => navigate(`/events/${event._id}`)}
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#4f46e5",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Book Now
              </button>
            </motion.div>
          ))
        ) : (
          <p>No events found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
