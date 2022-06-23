import React from "react";
import './CartItem.css';

function CartItem(props){
    return(
        <div className="cartItem">
            <div className="imageCartItem"></div>
            <div className="aboutCartItem">
                <h2 className="titleCartItem">Black shorts</h2>
                <p className="subtitleCartItem">In stock: <span>Yes</span></p>
            </div>
            <div className="counterCartItem">
                <div className="counterBtn">+</div>
                <div className="quantityCartItem">2</div>
                <div className="counterBtn">-</div>
            </div>
            <div className="priceCartItem">
                <p className="amountCartItem">$12.99</p>
                <p className="removeCartItem">Remove</p>
            </div>
        </div>
    )
}

export default CartItem;