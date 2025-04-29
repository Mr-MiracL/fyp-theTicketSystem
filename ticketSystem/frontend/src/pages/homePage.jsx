import React, { useContext, useState } from "react";

import SearchBar from "../components/searchBar";
import RecommendedEvents from "../components/recommendEvents";
import HelpCenter from "../components/helpCentre";
import PopularGrid from "../components/popularGrid";
import CategoryList from "../components/categoryList";
import { SearchContext } from "../context/searchContext";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.css"; 

const HomePage = () => {
  const [country, setCountry] = useState("");
  const [dates, setDates] = useState([]);
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { country, dates },
    });

    navigate(`http://localhost:5000/api/events/find/:id`); 
  };

  return (
    <div className="homepage-container">
      
      <CategoryList />
      <RecommendedEvents /> {/* ✅ 插入推荐组件 */}
      <SearchBar 
        country={country} 
        setCountry={setCountry} 
        dates={dates} 
        setDates={setDates} 
        onSearch={handleSearch} 
      />
     
      <div className="main-content">
        <div className="left-content">
          
          <PopularGrid />
        </div>
        <HelpCenter />
        
      </div>
    </div>
  );
};

export default HomePage;
