import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Menu from './pages/menu';
import About from './pages/about';
import Contact from './pages/contact';
import Cart from './pages/cart';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
