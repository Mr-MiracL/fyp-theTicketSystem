import React from "react";


const EventList = ({ events, setEvents, onEventClick }) => {
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" });
    setEvents((prev) => prev.filter((event) => event._id !== id));
  };

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event._id} onClick={() => onEventClick(event._id)} className="clickable-row">
            <td>{event.title}</td>
            <td>{new Date(event.date).toLocaleDateString()}</td>
            <td>
              <button>Edit</button>
              <button onClick={(e) => {
                e.stopPropagation(); // 阻止点击事件冒泡
                handleDelete(event._id);
              }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventList;
