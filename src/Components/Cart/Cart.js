import React from "react";
import CartItem from "../CartItem/CartItem";
import './Cart.css';

function Cart(){

    return (
        <div className="cartPage">
            <div className="cartContainer">
                <h3 className="cartHeading">Your cart</h3>
                <div className="cartItems">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
                <div className="checkout">
                    <div className="total">
                        <h4 className="subtotal">Subtotal</h4>
                        <div className="totalAmount">$39.43</div>
                    </div>
                    <button className="checkoutBtn">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;