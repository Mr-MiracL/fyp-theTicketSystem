import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import "../styles/orderPage.css";

const ORDERS_PER_PAGE = 5;

const OrderPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const [eventTitle, setEventTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!user) {
      const confirmLogin = window.confirm("You need to log in to view orders. Go to login page?");
      navigate(confirmLogin ? "/login" : "/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${user._id}`);
        setOrders(res.data);
        setFilteredOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const filterOrders = () => {
    let filtered = [...orders];

    if (eventTitle) {
      filtered = filtered.filter((order) =>
        order.tickets.some((ticketItem) =>
          ticketItem.ticket.event?.name.toLowerCase().includes(eventTitle.toLowerCase())
        )
      );
    }

    if (startDate) {
      filtered = filtered.filter((order) => new Date(order.createdAt) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter((order) => new Date(order.createdAt) <= new Date(endDate));
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); 
  };

  const resetFilters = () => {
    setEventTitle("");
    setStartDate("");
    setEndDate("");
    setFilteredOrders(orders);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterOrders();
    // eslint-disable-next-line
  }, [eventTitle, startDate, endDate]);

  const toggleDetails = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  
  const indexOfLastOrder = currentPage * ORDERS_PER_PAGE;
  const indexOfFirstOrder = indexOfLastOrder - ORDERS_PER_PAGE;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  return (
    <div className="order-page-container">
      <h1 className="order-title">My Orders</h1>

      
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="reset-btn" onClick={resetFilters}>Reset Filters</button>
      </div>

      {/* 订单展示 */}
      {currentOrders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        currentOrders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-summary">
              <div className="order-info">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total:</strong> ${order.totalAmount}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Purchased At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <button className="details-toggle" onClick={() => toggleDetails(order._id)}>
                {expandedOrderId === order._id ? "Hide Details" : "View Details"}
              </button>
            </div>

            {expandedOrderId === order._id && (
              <div className="order-details">
                {order.tickets.map((ticketItem, index) => (
                  <div key={index} className="ticket-info">
                    <p><strong>Event:</strong> {ticketItem.ticket.event?.name}</p>
                    <p><strong>Event Date:</strong> {new Date(ticketItem.ticket.event?.date).toLocaleDateString()}</p>
                    <p><strong>Area:</strong> {ticketItem.ticket.area}</p>
                    <p><strong>Type:</strong> {ticketItem.ticket.ticketType}</p>
                    <p><strong>Price:</strong> ${ticketItem.ticket.price}</p>
                    <p><strong>Quantity:</strong> {ticketItem.quantity}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {/* pagenation */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              className={`page-btn ${currentPage === idx + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
