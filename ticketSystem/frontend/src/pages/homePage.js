import React from "react";
import Navigation from "../components/navigation";
import SearchBar from "../components/searchBar";
import Category from "../components/category";
import EventGrid from "../components/grids";
import HelpCenter from "../components/helpCentre";
import "../styles/homepage.css"; 

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Navigation />
      <SearchBar />
      <Category />
      <div className="main-content">
        <div className="left-content">
          <EventGrid title="Recommendations" />
          <EventGrid title="Popular" />
        </div>
        <HelpCenter />
      </div>
    </div>
  );
};

export default HomePage;