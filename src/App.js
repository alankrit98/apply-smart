import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing"; // Ensure correct path to Landing.jsx
import ApplicationTracker from "./components/applicationtracker"; // Ensure correct path to ApplicationTracker.jsx
 import LoginSignup from "./components/login-signup";
 import ApplyForm from "./components/applyform";
 import Home from "./components/home";
 import ExploreJobs from './components/explorejobs';
 import Profile from './components/profile';
 import ExtendedProfile from './components/extendedprofile';
 import Resume from './components/resume';

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
        <Route path="/applyform" element={<ApplyForm />} />
        <Route path = "/home" element={<Home />} />
        <Route path="/explore-jobs" element={<ExploreJobs />} />
        <Route path = "/profile-page" element={<Profile />} />
        <Route path = "/extendedprofile" element = {<ExtendedProfile />} />
        <Route path = "/resume" element = {<Resume />} />
      </Routes>
    </Router>
  );
}

export default App;
