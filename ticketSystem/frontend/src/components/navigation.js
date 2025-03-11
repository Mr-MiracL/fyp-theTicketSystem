import React from 'react';

const Navigation = () => {
  return (
    <nav style={styles.navigation}>
      <div style={styles.logo}>Homepage</div>
      <div style={styles.links}>
        <span>Sells (Admin Only)</span>
        <span>Account State</span>
        <span>Message</span>
      </div>
    </nav>
  );
};

const styles = {
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #ccc',
  },
  logo: { fontSize: '20px', fontWeight: 'bold' },
  links: { display: 'flex', gap: '15px' },
};

export default Navigation;
