import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import Footer from "@components/footer";
import Navbar from "@components/navbar";
import Recettes from "@pages/Recettes";
import Depenses from "@pages/Depenses";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comptes" element={<Home />} />
            <Route path="/recettes" element={<Recettes />} />
            <Route path="/depenses" element={<Depenses />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
