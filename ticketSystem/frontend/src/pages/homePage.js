import React, { useContext, useState } from "react";
import Navigation from "../components/navigation";
import SearchBar from "../components/searchBar";
import EventGrid from "../components/grids";
import HelpCenter from "../components/helpCentre";
import PopularGrid from "../components/popular/popularGrid";
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

    navigate("/events/:id"); // 
  };

  return (
    <div className="homepage-container">
      <Navigation />
      <CategoryList />
      <SearchBar 
        country={country} 
        setCountry={setCountry} 
        dates={dates} 
        setDates={setDates} 
        onSearch={handleSearch} 
      />
      
      <div className="main-content">
        <div className="left-content">
          <EventGrid title="Recommendations" />
          <PopularGrid />
        </div>
        <HelpCenter />
      </div>
    </div>
  );
};

export default HomePage;
