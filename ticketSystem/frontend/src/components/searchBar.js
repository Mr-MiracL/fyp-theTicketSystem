import React from "react";

const SearchBar = ({ country, setCountry, dates, setDates, onSearch }) => {
  return (
    <div className="search-bar">
      {/* choose a country */}
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">choose country</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
        <option value="Japan">Japan</option>
        <option value="Australia">Australia</option>
        <option value="Canada">Canada</option>
      </select>

      {/* 选择日期 */}
      <input 
        type="date" 
        onChange={(e) => setDates([e.target.value])} 
      />

      <button onClick={onSearch}>search</button>
    </div>
  );
};

export default SearchBar;
