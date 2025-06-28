import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing"; // Ensure correct path to Landing.jsx
import ApplicationTracker from "./components/applicationtracker"; // Ensure correct path to ApplicationTracker.jsx
 import LoginSignup from "./components/login-signup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Landing Page */}
        <Route path="/" element={<Landing />} />
        {/* Route for Application Tracker Page */}
        <Route path="/applicationtracker" element={<ApplicationTracker />} />
        {/* <Route path="/login-signup" element={<LoginSignup />} /> */}
        <Route path="/login-signup" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
