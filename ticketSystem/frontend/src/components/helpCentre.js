import React, { useState } from 'react';
import axios from 'axios';

const HelpCenter = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/messages', { message })
      .then((res) => {
        setResponse('Your message has been sent successfully!');
        setMessage(''); 
      })
      .catch((err) => {
        setResponse('Error sending message. Please try again.');
      });
  };

  return (
    <div style={styles.container}>
      <h3>Help Center & FAQ</h3>
      <p>Find answers to common questions here.</p>

      {/* 新网页链接 */}
      <p>
        Need more help? Visit our{' '}
        <a href="http://localhost:3000/helpCenter" target="_blank" rel="noopener noreferrer">
          Help Center
        </a>
        {' '}for more details.
      </p>

      <div style={styles.messageBox}>
        <h4>Send us a message</h4>
        <textarea
          style={styles.textArea}
          value={message}
          onChange={handleMessageChange}
          placeholder="Write your message to the Work Customer Service"
        />
        <button style={styles.button} onClick={handleSubmit}>Send Message</button>
        {response && <p>{response}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', border: '1px solid #ccc', width: '300px', margin: '20px auto' },
  messageBox: { marginTop: '20px' },
  textArea: { width: '100%', height: '100px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }
};

export default HelpCenter;
