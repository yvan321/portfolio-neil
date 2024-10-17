import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'PORTFOLIO/src/App.jsx'; 
import './index.css';
import { ThemeProvider } from 'PORTFOLIO/src/common/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
