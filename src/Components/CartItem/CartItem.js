import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Api/cart";
import { findUserCart } from "../../store/cart/cartActions";
import './CartItem.css';

function CartItem(props){
    const product=props.item;
    const dispatch=useDispatch();

    const addItem=async (e)=>{
        e.preventDefault();
        try{
            const data={
                productId:product.id,
                qty:1
            }
            await addItemToCart(data);
            await dispatch(findUserCart());
        }catch(err){
            console.log(err);
        }
    };
    const removeItem=async (e)=>{
        e.preventDefault();
        try{
            const data={
                productId:product.id,
                qty:-1
            }
            console.log(data);
            await addItemToCart(data);
            await dispatch(findUserCart());
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="cartItem">
            <div className="imageCartItem"></div>
            <div className="aboutCartItem">
                <h2 className="titleCartItem">{product.name}:</h2>
                <p className="subtitleCartItem">In stock: <span>Yes</span></p>
            </div>
            <div className="counterCartItem">
                <div className="counterBtn" onClick={addItem}>+</div>
                <div className="quantityCartItem">{product.qty}</div>
                <div className="counterBtn" onClick={removeItem}>-</div>
            </div>
            <div className="priceCartItem">
                <p className="amountCartItem">${product.price}</p>
                <p className="removeCartItem">Remove</p>
            </div>
        </div>
    )
}

export default CartItem;