import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/eventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/find/${id}`)

      .then(res => setEvent(res.data))
      .catch(err => console.error("Error loading event detail:", err));
  }, [id]);

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="event-detail-container">
      <div className="event-banner">
        <img src={event.image} alt={event.name} />
      </div>
      <div className="event-info">
        <h1>{event.name}</h1>
        <p><strong>🗓 Date:</strong>{new Date(event.date).toLocaleDateString()}</p>
        <p><strong>📍 COuntry:</strong>{event.country}</p>
        <p><strong>🎫 Price of the tickets:</strong>${event.ticketPrice}</p>
        <p><strong>Remaining tickets:</strong>{event.availableTickets}</p>
        <p><strong>Discount:</strong>{event.discount ? `${event.discount}%` : "无"}</p>
        <p><strong>Categoty:</strong>{event.category}</p>

        {/* 你可以在这里扩展票型（如果有） */}
        <div className="ticket-types">
          <h3>🪪 票型信息（可扩展）</h3>
          <p>目前统一票型：普通票 - ${event.ticketPrice}</p>
          {/* 若 future 扩展票型数组，可在此 map 渲染 */}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
