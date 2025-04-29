import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const HelpCenter = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

 

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('Login required to send messages.');
      navigate('/login');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/messages',
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponse('Your message has been sent successfully!');
      setMessage('');
      toast.success('Message sent successfully!');
    } catch (error) {
      setResponse('Error sending message. Please try again.');
      toast.error('Failed to send message.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Help Center</h2>
      <p>If you have any questions, feel free to contact our support team.</p>

      <p>
        You can also visit our{' '}
        <a href="/helpCenter" target="_blank" rel="noopener noreferrer">
          full Help Center page
        </a>
        {' '}for FAQs and more information.
      </p>

      <div style={styles.messageBox}>
        <h4>Send a Message to Customer Service</h4>
        <textarea
          style={styles.textArea}
          value={message}
          onChange={handleMessageChange}
          placeholder="Describe your issue here..."
        />
        <button style={styles.button} onClick={handleSubmit}>
          Send Message
        </button>
        {response && <p style={styles.responseText}>{response}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '260px',
    margin: '40px auto',
    
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
  },
  messageBox: {
    marginTop: '20px',
  },
  textArea: {
    width: '100%',
    height: '120px',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    resize: 'vertical',
  },
  button: {
    marginTop: '12px',
    padding: '10px 16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  responseText: {
    marginTop: '10px',
    color: '#333',
  },
};

export default HelpCenter;
