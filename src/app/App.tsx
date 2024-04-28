import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, Application, Home, Payment, Signup } from '../pages/index'
import { ApiServiceProvider } from '../contexts/ApiServiceContext';
import './App.scss';

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
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </ApiServiceProvider>

    </div>
  );
}

export default App;
