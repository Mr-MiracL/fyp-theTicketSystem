import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import HomePage from './pages/homePage.jsx';
import OrderPage from "./pages/orderPage.jsx";
import AdminDashboard from "./pages/adminPage.jsx";
import SearchResults from "./pages/searchPage.jsx";
import React from 'react'
import Payment from "./pages/paymentPage.jsx";
import { AuthContextProvider } from "./context/authContext.js";
import EventDetail from "./pages/EventDetail.jsx";
import EventList from "./pages/categoryList.jsx"
import { SearchContextProvider } from "./context/searchContext.js"
import HelpCenter from "./pages/helpCentrePage.jsx";
import { ToastContainer } from "react-toastify";
import Layout from "./components/layout.jsx"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <SearchContextProvider>
      <AuthContextProvider>
        <Router>
          <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/category/:category" element={<EventList />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/helpCenter" element={<HelpCenter />} />
              <Route path="/payment/:ticketId" element={<Payment />} />
              <Route path="/orderPage" element={<OrderPage />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer position="top-center" />
      </AuthContextProvider>
    </SearchContextProvider>
  );
}

export default App;
