// Navbar.jsx
import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../contest/ShopContext';
import dropdown_icon from '../Assets/dropdown_icon.png'
const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const navigate = useNavigate(); // Initialize useNavigate
  const {gettotalCartItems}=useContext(ShopContext)
  const menuRef =useRef()

  const dropDown_toggle=(e) =>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
  }

  return (
    
    <div className="navbar">
  <img className="nav-dropdown" onClick={dropDown_toggle} src={dropdown_icon} alt="Menu Icon" />
  <div className="nav-logo">
    <img src={logo} alt="Logo" />
    <p>NK & SONS</p>
  </div>
  <ul ref={menuRef} className="nav-menu">
    <li onClick={() => setMenu("shop")}>
      <Link to="/shop">Shop {menu === "shop" ? <hr /> : null}</Link>
    </li>
    <li onClick={() => setMenu("mens")}>
      <Link to="/men">Men {menu === "mens" ? <hr /> : null}</Link>
    </li>
    <li onClick={() => setMenu("women")}>
      <Link to="/women">Women {menu === "women" ? <hr /> : null}</Link>
    </li>
    <li onClick={() => setMenu("kids")}>
      <Link to="/kids">Kids {menu === "kids" ? <hr /> : null}</Link>
    </li>
  </ul>
  <div className="nav-login-cart">
    {localStorage.getItem('auth-token') ? (
      <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>Logout</button>
    ) : (
      <button onClick={() => navigate("/login")}>Login</button>
    )}
    <Link to ={`/cart`}><img src={cart_icon} alt="Cart Icon" /></Link>
    <div className="nav-cart-count">{gettotalCartItems()}</div>
  </div>
</div>

  );
};

export default Navbar;
