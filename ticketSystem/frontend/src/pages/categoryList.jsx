import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";  
import "../styles/categoryList.css";

import { useNavigate } from "react-router-dom";

const CategoryList = () => {
    const { category } = useParams();  
    const [events, setEvents] = useState([]);  
    const [filteredEvents, setFilteredEvents] = useState([]);  
    const [searchTerm, setSearchTerm] = useState("");  
    const [startDate, setStartDate] = useState("");  
    const [endDate, setEndDate] = useState("");  
    const [selectedCountry, setSelectedCountry] = useState("");  
    
    const navigate = useNavigate();

  
    useEffect(() => {
        if (!category) return;  
        axios.get(`http://localhost:5000/api/events?category=${category}`)
            .then(response => {
                setEvents(response.data);  
                setFilteredEvents(response.data); 
            })
            .catch(error => console.error("Error fetching events:", error));
    }, [category]);  


    useEffect(() => {
        let filtered = events.filter(event =>
            event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (startDate ? new Date(event.date) >= new Date(startDate) : true) &&
            (endDate ? new Date(event.date) <= new Date(endDate) : true) &&
            (selectedCountry ? event.country.toLowerCase() === selectedCountry.toLowerCase() : true) 
           
        );
        setFilteredEvents(filtered);
    }, [searchTerm, startDate, endDate, selectedCountry,  events]);  

    return (
        <div className="event-page">
          <div className="event-list">
            {filteredEvents.map((event) => (
              <div key={event._id} className="event-card">
                <img src={event.image} alt={event.name} className="event-image" />
                <h3>{event.name}</h3>
                <p>{new Date(event.date).toDateString()} | {event.country}</p>
             
               
                <button 
                  className="details-btn" 
                  onClick={() => navigate(`/events/${event._id}`)}>
                  check tickets
                </button>
              </div>
            ))}
          </div>

           
            <div className="filter-panel">
                <h3>Search Events</h3>
                
                
                <input
                    type="text"
                    placeholder="search event title"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />

                
                <label>start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                />
                
                <label>end Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                />

             
                <select
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                >
                    <option value="">All country</option>
                    <option value="USA">USA</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Netherlands">Netherlands</option>
                </select>

                
        
                <button onClick={() => {
                    setSearchTerm("");
                    setStartDate("");
                    setEndDate("");
                    setSelectedCountry("");
                }}>Reset</button>
            </div>
        </div>
    );
};

export default CategoryList;
