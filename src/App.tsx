import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Portefolio from "./Portefolio";
import Contact from "./Contact";
import React from "react";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Routes>
          <Route path="/" element={<Portefolio />} />
          <Route path="/Portefolio" element={<Portefolio />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </Router>
    </MotionConfig>
  );
}