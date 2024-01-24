import React, { useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './Routes';
import './App.css';
function App() {
  return (
    <Router>
      <div className="background-image">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;