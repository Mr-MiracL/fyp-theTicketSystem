import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/searchBar.css"; 

const SearchBar = () => {
  const [country, setCountry] = useState("");
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  const [keyword, setKeyword] = useState("");  
  const navigate = useNavigate();

  const handleSearch = () => {
    
    let searchParams = "?";
    
    if (country) searchParams += `country=${country}&`;
    if (dates.startDate) searchParams += `startDate=${dates.startDate}&`;
    if (dates.endDate) searchParams += `endDate=${dates.endDate}&`;
  
    if (keyword) searchParams += `keyword=${keyword}&`; 


    searchParams = searchParams.slice(0, -1);


    navigate(`/search-results${searchParams}`);
  };

  return (
    <div className="search-bar-container">
      <h3>Search Events</h3>
      <div className="search-bar">
        <select
          className="select-dropdown"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Choose country</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Japan">Japan</option>
          <option value="Australia">Australia</option>
          <option value="Canada">Canada</option>
        </select>

        <input
          type="date"
          className="date-picker"
          value={dates.startDate}
          onChange={(e) => setDates((prev) => ({ ...prev, startDate: e.target.value }))}
          placeholder="Start Date"
        />

        <input
          type="date"
          className="date-picker"
          value={dates.endDate}
          onChange={(e) => setDates((prev) => ({ ...prev, endDate: e.target.value }))}
          placeholder="End Date"
        />

   

        <input
          type="text"
          className="keyword-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword"
        />

        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
