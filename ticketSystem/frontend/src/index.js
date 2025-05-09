import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './app';
import './index.css'
import {AuthContextProvider} from "./context/authContext"
import {SearchContextProvider} from "./context/searchContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
      <App />
      </SearchContextProvider>
    </AuthContextProvider>
    
  </React.StrictMode>
);
