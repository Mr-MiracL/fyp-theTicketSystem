import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/messageModal.css";

const MessageModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyInputs, setReplyInputs] = useState({}); 

  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userInfo?.role === "admin";


useEffect(() => {
  const fetchMessages = async () => {
    try {
      if (!token || !userInfo) throw new Error("Missing user info or token");

      const url = isAdmin
        ? "http://localhost:5000/api/messages/all"
        : "http://localhost:5000/api/messages/user";

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(res.data.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchMessages();
}, []); 


  const handleReplyChange = (id, value) => {
    setReplyInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleReplySubmit = async (messageId) => {
    const reply = replyInputs[messageId];
    if (!reply || !messageId) return;
  
    try {
      const res = await axios.put(
        `http://localhost:5000/api/messages/reply/${messageId}`,
        { reply },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, reply } : msg
        )
      );
  
      setReplyInputs((prev) => ({ ...prev, [messageId]: "" }));
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal message-modal">
        <h2>{isAdmin ? "User Messages" : "Your Messages"}</h2>

        <div className="messages-list">
          {loading ? (
            <p>Loading...</p>
          ) : messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg._id} className="message-card">
                {isAdmin && (
                  <p className="username"><strong>User:</strong> {msg.username || msg.user?.username || "Unknown"}</p>
                )}
                <p className="message-text"><strong>Message:</strong> {msg.message}</p>

                {msg.reply ? (
                  <p className="reply-text"><strong>Reply:</strong> {msg.reply}</p>
                ) : isAdmin ? (
                  <div className="reply-box">
                    <textarea
                      rows="2"
                      placeholder="Write a reply..."
                      value={replyInputs[msg._id] || ""}
                      onChange={(e) => handleReplyChange(msg._id, e.target.value)}
                    />
                    <button onClick={() => handleReplySubmit(msg._id)}>Send Reply</button>
                  </div>
                ) : (
                  <p className="reply-text"><em>No reply yet.</em></p>
                )}

                <p className="timestamp">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>

        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
