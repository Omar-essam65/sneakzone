import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Sneakers from './pages/Sneakers';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Trending from './pages/Trending';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sneakers" element={<Sneakers />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <h2 style={{ fontSize: '60px', fontFamily: 'Bebas Neue' }}>404</h2>
            <p>Page not found.</p>
          </div>
        } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
