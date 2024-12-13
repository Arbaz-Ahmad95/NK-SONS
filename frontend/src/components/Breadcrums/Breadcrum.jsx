import React from 'react';
import './breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
    const { product } = props;

    // Check if product exists to avoid errors
    if (!product) {
        return (
            <div className='breadcrum'>
                HOME <img src={arrow_icon} alt="" /> SHOP
                <span> (Product details not available) </span>
            </div>
        );
    }

    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> 
            {product.category || 'Unknown Category'} <img src={arrow_icon} alt="" /> 
            {product.name || 'Unknown Product'}
        </div>
    );
};

export default Breadcrum;
