import Checkout from './components/Checkout';
// ...
<Route path="/checkout" element={<Checkout />} />


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './components/loginsignup/LoginSignup';
import Home from './components/loginsignup/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
