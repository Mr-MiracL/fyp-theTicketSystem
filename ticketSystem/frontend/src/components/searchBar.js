import React from 'react';

const SearchBar = () => {
  return (
    <div style={styles.searchContainer}>
      <input type="text" placeholder="Search" style={styles.input} />
      
    </div>
  );
};

const styles = {
  searchContainer: { display: 'flex', alignItems: 'center', padding: '10px' },
  input: { width: '200px', padding: '8px', marginRight: '5px' },
};

export default SearchBar;
