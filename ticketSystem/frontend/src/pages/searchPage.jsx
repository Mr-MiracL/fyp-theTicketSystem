import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const country = queryParams.get("country");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const category = queryParams.get("category");
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      try {
        // 构建后端请求参数
        const params = {
          country,
          startDate,
          endDate,
          category,
          keyword,
        };

        // 请求符合条件的事件数据
        const response = await axios.get("http://localhost:5000/api/events", { params });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchFilteredEvents();
  }, [country, startDate, endDate, category, keyword]);

  return (
    <div className="search-results-container">
      <h2>Search Results</h2>
      <div className="event-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.name}</h3>
              <p>{new Date(event.date).toDateString()} | {event.country}</p>
              <p><strong className="price">${event.ticketPrice}</strong></p>
              <p>Available Tickets: <span className="tickets">{event.availableTickets}</span></p>
              <p>Discount: <span className="discount">{event.discount}%</span></p>
              <button className="book-btn">Book Now</button>
            </div>
          ))
        ) : (
          <p>No events found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
