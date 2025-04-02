import React from "react";
import Navigation from "../components/navigation";
import SearchBar from "../components/searchBar";

import EventGrid from "../components/grids";
import HelpCenter from "../components/helpCentre";
import PopularGrid from "../components/popular/popularGrid";
import "../styles/homepage.css"; 
import CategoryList from "../components/categoryList";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Navigation />
      <SearchBar />
      <CategoryList/>
      <div className="main-content">
        <div className="left-content">
          <EventGrid title="Recommendations" />
          <PopularGrid /> {/* 使用新的 Popular 组件 */}
        </div>
        <HelpCenter />
      </div>
    </div>
  );
};

export default HomePage;