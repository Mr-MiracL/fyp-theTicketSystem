import React from "react";

const SearchBar = ({ country, setCountry, dates, setDates, onSearch }) => {
  return (
    <div className="search-bar">
      {/* 选择国家 */}
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">选择国家</option>
        <option value="USA">美国</option>
        <option value="UK">英国</option>
        <option value="Germany">德国</option>
        <option value="France">法国</option>
        <option value="Japan">日本</option>
        <option value="Australia">澳大利亚</option>
        <option value="Canada">加拿大</option>
      </select>

      {/* 选择日期 */}
      <input 
        type="date" 
        onChange={(e) => setDates([e.target.value])} 
      />

      {/* 搜索按钮 */}
      <button onClick={onSearch}>搜索</button>
    </div>
  );
};

export default SearchBar;
