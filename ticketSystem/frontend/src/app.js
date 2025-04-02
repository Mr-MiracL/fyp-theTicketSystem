import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage.js";
import RegisterPage from "./pages/registerPage.js";
import HomePage from './pages/homePage.js';
import InitialPage from "./pages/initialPage.js";
import React from 'react';
import { AuthProvider } from "./context/authContext";

import EventList from "./pages/eventList.jsx"

function App() {
  return (
    <AuthProvider>

    <Router>
      <Routes>
     <Route path="/homepage" element={<InitialPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/category/:category" element={<EventList />} />
        
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
