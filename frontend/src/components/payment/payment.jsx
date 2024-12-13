import React, { useContext } from 'react';
import './payment.css'; // Import the CSS file
import { ShopContext } from '../../contest/ShopContext';
import { useNavigate } from 'react-router-dom';

const Payment = () => {

    const navigate = useNavigate();
    const {gettotalCartAmount,all_product, cartItems, removeFromCart } = useContext(ShopContext);
    return (
        <div className="payment-page">
            <div className="payment-form">
                <h1>Secure Payment</h1>

                <div className="payment-methods">
                    <h2>Select Payment Method</h2>

                    {/* Debit/Credit Card Option */}
                    <div className="payment-option">
                        <input type="radio" id="card" name="payment-method" />
                        <label htmlFor="card">
                            <div className="payment-option-icon">
                                <i className="fas fa-credit-card"></i> {/* Font Awesome Card Icon */}
                            </div>
                            <span>Debit/Credit Card</span>
                        </label>
                    </div>

                    {/* UPI (PhonePe, Google Pay) Option */}
                    <div className="payment-option">
                        <input type="radio" id="upi" name="payment-method" />
                        <label htmlFor="upi">
                            <div className="payment-option-icon">
                                <i className="fab fa-google-pay"></i> {/* Google Pay Icon */}
                            </div>
                            <span>UPI (PhonePe, Google Pay)</span>
                        </label>
                    </div>

                    {/* Net Banking Option */}
                    <div className="payment-option">
                        <input type="radio" id="netbanking" name="payment-method" />
                        <label htmlFor="netbanking">
                            <div className="payment-option-icon">
                                <i className="fas fa-university"></i> {/* Font Awesome Bank Icon */}
                            </div>
                            <span>Net Banking</span>
                        </label>
                    </div>

                    {/* Cash on Delivery Option */}
                    <div className="payment-option">
                        <input type="radio" id="cod" name="payment-method" />
                        <label htmlFor="cod">
                            <div className="payment-option-icon">
                                <i className="fas fa-cash-register"></i> {/* Cash Icon */}
                            </div>
                            <span>Cash on Delivery</span>
                        </label>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="payment-details">
                    <h3>Order Summary</h3>
                    <div className="payment-summary-item">
                        <p>Subtotal</p>
                        <p>${gettotalCartAmount()}</p>
                    </div>
                    <div className="payment-summary-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <div className="payment-summary-item">
                        <h3>Total</h3>
                        <h3>${gettotalCartAmount()}</h3>
                    </div>
                </div>

                <button className="pay-now-btn">Proceed to Pay</button>
            </div>
        </div>
    );
};

export default Payment;
