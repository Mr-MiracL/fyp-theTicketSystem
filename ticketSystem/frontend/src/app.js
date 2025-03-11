import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage.js";
import RegisterPage from "./pages/registerPage.js";
import HomePage from './pages/homePage.js';
import InitialPage from "./pages/initialPage.js";
import React from 'react';
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>

    <Router>
      <Routes>
        <Route path="/" element={<InitialPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/homepage" element={<HomePage/>} />

        
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
