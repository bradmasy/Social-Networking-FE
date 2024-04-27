import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, Application, Home, Payment } from '../pages/index'
import { ApiService } from '../services/api/ApiService';

import './App.scss';
import { ApiServiceProvider } from '../contexts/ApiServiceContext';

function App() {

  return (
    <div className="App">
      <ApiServiceProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<Application />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </Router>
      </ApiServiceProvider>

    </div>
  );
}

export default App;
