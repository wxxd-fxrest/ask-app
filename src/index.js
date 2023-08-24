import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import './reset.css' ; 
import { AuthContextProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
