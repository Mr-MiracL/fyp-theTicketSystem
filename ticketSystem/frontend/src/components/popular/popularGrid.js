import React from "react";
import useFetch from "../../hooks/useFetch";
import "../../styles/popularGrid.css";

const PopularGrid = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/api/events/popular");

  if (loading) return <p>Loading popular events...</p>;
  if (error) return <p>Error fetching events: {error.message}</p>;

  return (
    <div className="popular-grid">
      <h2>Popular Events</h2>
      <div className="popular-cards">
        {data.map((event) => (
          <div key={event.id} className="popular-card" style={{ backgroundImage: `url(${event.image})` }}>
            <div className="popular-info">
              <h3>{event.name}</h3>
              <p>{event.date} | {event.country}</p>
              <p className="price-tag">${event.ticketPrice}</p>
              <p>Available Tickets: <span className="available-tickets">{event.availableTickets}</span></p>
              {event.discount > 0 && <p className="discount">Discount: {event.discount}%</p>}
              <button>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularGrid;
