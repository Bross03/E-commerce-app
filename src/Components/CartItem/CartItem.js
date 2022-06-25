import React from "react";
import './CartItem.css';

function CartItem(props){
    const product=props.item;
    return(
        <div className="cartItem">
            <div className="imageCartItem"></div>
            <div className="aboutCartItem">
                <h2 className="titleCartItem">{product.name}:</h2>
                <p className="subtitleCartItem">In stock: <span>Yes</span></p>
            </div>
            <div className="counterCartItem">
                <div className="counterBtn">+</div>
                <div className="quantityCartItem">{product.qty}</div>
                <div className="counterBtn">-</div>
            </div>
            <div className="priceCartItem">
                <p className="amountCartItem">${product.price}</p>
                <p className="removeCartItem">Remove</p>
            </div>
        </div>
    )
}

export default CartItem;