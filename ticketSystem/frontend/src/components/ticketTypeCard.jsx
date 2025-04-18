import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/ticketTypeCard.css"; 

const TicketTypeCard = ({ type, price, description, area, availableTickets, ticketId }) => {
  const navigate = useNavigate(); 

  const handleBookNowClick = () => {
    if (ticketId) {
      navigate(`/payment/${ticketId}`); 
    } else {
      console.error("Ticket ID is missing!");
    }
  };

  return (
    <div className="ticket-type-card">
      <h4>{type}</h4>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Area:</strong> {area}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Available Tickets:</strong> {availableTickets}</p>
      <button className="book-now" onClick={handleBookNowClick}>Book Now</button>
    </div>
  );
};

export default TicketTypeCard;
