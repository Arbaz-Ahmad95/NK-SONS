import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../contest/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const navigate = useNavigate();
    const { gettotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    // Debugging: Check the type of all_product
    console.log("all_product:", all_product);

    // Validate that all_product is an array
    if (!Array.isArray(all_product)) {
        return <p>Loading cart items...</p>; // Fallback if data is not yet ready
    }

    return (
        <div className="cartitems">
            {/* Header */}
            <div className="cartitem-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {/* Product List */}
            {all_product.map((product) => {
                const productQuantity = cartItems?.[product.id] || 0; // Default to 0 if undefined
                if (productQuantity > 0) {
                    return (
                        <div key={product.id}>
                            <div className="cartitems-format cartitem-format-main">
                                <img src={product.image} alt="" className="carticon-product-icon" />
                                <p>{product.name}</p>
                                <p>${product.new_price}</p>
                                <button className="cartitems-quantity">{productQuantity}</button>
                                <p>${(product.new_price * productQuantity).toFixed(2)}</p>
                                <img
                                    className="cartItems-remove-icon"
                                    src={remove_icon}
                                    onClick={() => removeFromCart(product.id)}
                                    alt="Remove"
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null; // Skip products with quantity 0
            })}

            {/* Footer Section */}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal </p>
                            <p>${gettotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${gettotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={() => navigate('/payment')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="promo code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
