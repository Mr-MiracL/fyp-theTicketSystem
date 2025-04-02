import React from "react";
import "../styles/eventGrid.css";

const EventCard = ({ name, date, country, ticketPrice, image }) => {
    return (
        <div className="event-card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{new Date(date).toDateString()} | {country}</p>
            <p>Price: ${ticketPrice}</p>
        </div>
    );
};

export default EventCard;
