import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.tsx";
import Race from "./components/Race.tsx";
import Results from "./components/Results.tsx";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Profile from "./components/Profile.tsx";
import React from "react";

const RouterComponent = (): React.JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/race" element={<Race />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
