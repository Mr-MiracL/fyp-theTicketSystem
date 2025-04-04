import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage.js";
import RegisterPage from "./pages/registerPage.js";
import HomePage from './pages/homePage.js';
import InitialPage from "./pages/initialPage.js";
import React from 'react';
import { AuthProvider } from "./context/authContext.js";
import EventDetail from "./pages/EventDetail.jsx";
import EventList from "./pages/categoryList.jsx"
import { SearchContextProvider } from "./context/searchContext.js"

function App() {
  return (
    <SearchContextProvider>
    <AuthProvider>

    <Router>
      <Routes>
     <Route path="/homepage" element={<InitialPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/category/:category" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </Router>
    </AuthProvider>
    </SearchContextProvider>
  );
}

export default App;
