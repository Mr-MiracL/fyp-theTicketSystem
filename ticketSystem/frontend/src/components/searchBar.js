import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 使用 React Router 实现页面跳转
import "../styles/searchBar.css"; 

const SearchBar = () => {
  const [country, setCountry] = useState("");
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  const [keyword, setKeyword] = useState("");  // 新增：关键词搜索
  const navigate = useNavigate();

  const handleSearch = () => {
    // 构建查询字符串：排除未填写的条件
    let searchParams = "?";
    
    if (country) searchParams += `country=${country}&`;
    if (dates.startDate) searchParams += `startDate=${dates.startDate}&`;
    if (dates.endDate) searchParams += `endDate=${dates.endDate}&`;
  
    if (keyword) searchParams += `keyword=${keyword}&`; // 添加关键词参数

    // 去除末尾多余的 `&`
    searchParams = searchParams.slice(0, -1);

    // 使用 navigate 跳转到搜索结果页面，并传递搜索条件
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
