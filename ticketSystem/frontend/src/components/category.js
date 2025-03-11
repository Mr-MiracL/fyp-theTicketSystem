import React from 'react';

const Category = () => {
  return (
    <div style={styles.tabContainer}>
      <span>Sports</span>
      <span>Concerts</span>
      <span>Operas</span>
      <span>Others</span>
    </div>
  );
};

const styles = {
  tabContainer: { display: 'flex', justifyContent: 'center', gap: '20px', padding: '10px', borderBottom: '2px solid #ccc' },
};

export default Category;