import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import Shop from './pages/shop';
import Footer from './components/Footer/Footer';
import ShopCategory from './pages/shopCategory';
import men_banner from './components/Assets/banner_mens.png';
import women_banner from './components/Assets/banner_women.png';
import kid_banner from './components/Assets/banner_kids.png';
import LoginSignUp from './pages/loginSignUp';
import Product from './pages/product';
import Cart from './pages/cart';
import Payment from './components/payment/payment';
import CartItems from './components/CartItems/CartItems';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/men"
          element={<ShopCategory banner={men_banner} category="Men" />}
        />
        <Route
          path="/women"
          element={<ShopCategory banner={women_banner} category="Women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kid_banner} category="Kid" />}
        />
        <Route path="/product/:productId" element={<Product />} /> {/* Updated Route */}
        <Route path="/cart" element={<Cart />} />

        <Route path="/payment" element={<Payment />} />
        <Route path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />

      
    </Router>
  );
}

export default App;
