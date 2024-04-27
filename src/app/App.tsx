import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, Application, Home } from '../pages/index'

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/apply" element={<Application />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
