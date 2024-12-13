import React, { useContext } from 'react';
import './productDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../contest/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    // Check if product is undefined
    if (!product) {
        return (
            <div className="productdisplay">
                <h2>Loading product details...</h2>
            </div>
        );
    }

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {/* Render images only if product.image exists */}
                    {product.image ? (
                        <>
                            <img src={product.image} alt="Product Thumbnail 1" />
                            <img src={product.image} alt="Product Thumbnail 2" />
                            <img src={product.image} alt="Product Thumbnail 3" />
                            <img src={product.image} alt="Product Thumbnail 4" />
                        </>
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
                <div className="productdisplay-img">
                    <img
                        className="productdisplay-main-img"
                        src={product.image || 'default-image.jpg'}
                        alt="Main Product"
                    />
                </div>
            </div>

            <div className="productdisplay-right">
                <h1>{product.name || 'Unknown Product'}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_dull_icon} alt="Star Dull Icon" />
                    <p>(122)</p>
                </div>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${product.old_price || '0.00'}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price || '0.00'}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight, usually knitted, pullover shirt, close-fitting and a round neckline, short sleeves, worn as an undershirt or outer.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdsiplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (product.id) {
                            addToCart(product.id);
                        } else {
                            console.error('Product ID is undefined.');
                        }
                    }}
                >
                    ADD TO CART
                </button>
                <p className="productdisplay-right-category">
                    <span>Category:</span> Women, T-Shirt, Crop Top
                </p>
                <p className="productdisplay-right-category">
                    <span>Tags:</span> Modern, Latest
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;
