import React from 'react';
import './navbar.css';
import logo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'


const Navbar = () => {
    return (
        <div className='navbar'>
           <img src={logo} alt="Logo" className="nav-logo" />
           <img src= {navProfile} alt='' className='nav-profile' />
            
        </div>
    );
};

export default Navbar;
