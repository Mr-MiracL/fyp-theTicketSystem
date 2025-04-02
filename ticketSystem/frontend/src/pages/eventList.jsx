import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/eventList.css";

const EventList = () => {
    const [events, setEvents] = useState([]);  // 全部事件
    const [filteredEvents, setFilteredEvents] = useState([]);  // 筛选后的事件
    const [searchTerm, setSearchTerm] = useState("");  // 搜索名称
    const [selectedDate, setSelectedDate] = useState("");  // 选定日期
    const [selectedCountry, setSelectedCountry] = useState("");  // 选定国家

    // 获取事件数据
    useEffect(() => {
        axios.get("http://localhost:5000/api/events")
            .then(response => {
                setEvents(response.data);
                setFilteredEvents(response.data); // 初始时，显示全部数据
            })
            .catch(error => console.error("Error fetching events:", error));
    }, []);

    // 处理筛选逻辑
    useEffect(() => {
        let filtered = events.filter(event =>
            event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedDate ? event.date.startsWith(selectedDate) : true) &&
            (selectedCountry ? event.country.toLowerCase() === selectedCountry.toLowerCase() : true)
        );
        setFilteredEvents(filtered);
    }, [searchTerm, selectedDate, selectedCountry, events]);

    return (
        <div className="event-page">
            {/* 左侧：事件列表 */}
            <div className="event-list">
                {filteredEvents.map(event => (
                    <div key={event._id} className="event-card">
                        <img src={event.image} alt={event.name} className="event-image" />
                        <h3>{event.name}</h3>
                        <p>{new Date(event.date).toDateString()} | {event.country}</p>
                        <p>Price: ${event.ticketPrice}</p>
                    </div>
                ))}
            </div>

            {/* 右侧：搜索 & 筛选栏 */}
            <div className="filter-panel">
                <h3>🔍 搜索/筛选事件</h3>
                <input
                    type="text"
                    placeholder="搜索事件名称..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />

                <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                />

                <select
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                >
                    <option value="">所有国家</option>
                    <option value="USA">USA</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Netherlands">Netherlands</option>
                </select>

                <button onClick={() => {
                    setSearchTerm("");
                    setSelectedDate("");
                    setSelectedCountry("");
                }}>重置筛选</button>
            </div>
        </div>
    );
};

export default EventList;
