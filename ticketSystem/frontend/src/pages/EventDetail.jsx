import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/eventDetail.css";
import TicketTypeCard from "../components/ticketTypeCard";

const EventDetail = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]); // 确保初始化为空数组

  // 获取活动详情
  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/find/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error("Error loading event detail:", err));
  }, [id]);

  // 获取票务信息
  useEffect(() => {
    axios.get(`http://localhost:5000/api/tickets/tickets/${id}`)
      .then(res => {
        console.log("Tickets data:", res.data);  // 调试输出
        if (Array.isArray(res.data)) {
          setTickets(res.data);
        } else {
          console.error("Tickets data is not an array:", res.data);
        }
      })
      .catch(err => console.error("Error loading ticket details:", err));
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
        <p><strong>📍 Country:</strong>{event.country}</p>
        <p><strong>🎫 Price of the tickets:</strong>${event.ticketPrice}</p>
        <p><strong>Remaining tickets:</strong>{event.availableTickets}</p>
        <p><strong>Discount:</strong>{event.discount ? `${event.discount}%` : "None"}</p>
        <p><strong>Category:</strong>{event.category}</p>

        <div className="ticket-types">
          <h3>🪪 Ticket Types</h3>
          {/* 渲染每个票型卡片 */}
          {tickets && tickets.length > 0 ? (
            tickets.map(ticket => (
              <TicketTypeCard
                key={ticket._id}
                type={ticket.ticketType}
                ticketId={ticket._id}
                price={ticket.price}
                description={ticket.specialRequests || "No special requests"}
                availableTickets={ticket.availableTickets}
                area={ticket.area}
              />
            ))
          ) : (
            <p>No tickets available for this event.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
