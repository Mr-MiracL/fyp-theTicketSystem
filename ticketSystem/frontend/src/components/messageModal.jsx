import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/messageModal.css";

const MessageModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const userInfo = JSON.parse(localStorage.getItem("user")); // 假设你在登录时把 user 信息保存了

        if (!token || !userInfo) {
          throw new Error("No token or user info found");
        }

        const isAdmin = userInfo.role === "admin"; // 判断管理员
        const url = isAdmin
        ? "http://localhost:5000/api/messages/all"
        : "http://localhost:5000/api/messages/user";
      

        const res = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setMessages(res.data.data); // ⚠️ 确保后端返回结构为 { data: [...] }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal message-modal">
        <h2>Your Messages</h2>
        <div className="messages-list">
          {loading ? (
            <p>Loading...</p>
          ) : messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg._id} className="message-card">
                <p className="message-text">
                  <strong>Message:</strong> {msg.message}
                </p>
                {msg.reply && (
                  <p className="reply-text">
                    <strong>Reply:</strong> {msg.reply}
                  </p>
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
