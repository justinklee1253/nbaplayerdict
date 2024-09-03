import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./Components/SearchPage";
import PlayerInfoPage from "./Components/PlayerInfoPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/player/:searchInput" element={<PlayerInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;