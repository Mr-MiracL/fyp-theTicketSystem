import React from 'react';

const EventGrid = ({ title }) => {
  return (
    <div style={styles.container}>
      <h3>{title}</h3>
      <div style={styles.grid}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={styles.card}>Event {i + 1}</div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '10px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
  card: { backgroundColor: '#ddd', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
};

export default EventGrid;
