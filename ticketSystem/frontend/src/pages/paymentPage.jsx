
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import "../styles/paymentPage.css"; 

const Payment = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [ticket, setTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [seatPreference, setSeatPreference] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [discountCode, setDiscountCode] = useState("");

  useEffect(() => {
    if (!user) {
      const confirmLogin = window.confirm("You need to log in to purchase tickets. Go to login page?");
      navigate(confirmLogin ? "/login" : "/");
    }
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tickets/ticket/${ticketId}`)
      .then((res) => setTicket(res.data))
      .catch((err) => console.error("Error loading ticket:", err));
  }, [ticketId]);

  if (!ticket) return <p className="loading">Loading payment information...</p>;

  const maxTickets = ticket.availableTickets || 10;
  const totalPrice = (ticket.price * quantity).toFixed(2);

  const goBackToEvent = () => {
    if (ticket?.title) {
      navigate(`/events/${ticket.event}`);
    } else {
      alert("Event information not found.");
    }
  };
  

  return (
    <div className="payment-container">
      <h1 className="payment-title"> Payment Page</h1>
      <div className="back-button-wrapper">
  <button className="back-button" onClick={goBackToEvent}>
    ← Back to Event
  </button>
</div>

      <div className="ticket-info">
        <p><strong>Ticket Type:</strong> {ticket.ticketType}</p>
        <p><strong>Price per Ticket:</strong> ${ticket.price}</p>
        <p><strong>Area:</strong> {ticket.area || "General"}</p>
      </div>

      <div className="form-group">
        <label>Select Quantity:</label>
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {Array.from({ length: maxTickets }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Seat Preference:</label>
        <select value={seatPreference} onChange={(e) => setSeatPreference(e.target.value)}>
          <option value="">No preference</option>
          <option value="Front">Front</option>
          <option value="Middle">Middle</option>
          <option value="Back">Back</option>
        </select>
      </div>

      <div className="form-group">
        <label>Special Request:</label>
        <input
          type="text"
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          placeholder="Any special request?"
        />
      </div>

      <div className="form-group">
        <label>Discount Code:</label>
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Enter code if any"
        />
      </div>

      <div className="total-price">
        <strong>Total Price: ${totalPrice}</strong>
      </div>

      <button className="pay-button">Proceed to Payment</button>
    </div>
  );
};

export default Payment;
