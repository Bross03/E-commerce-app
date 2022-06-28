import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkout } from "../../Api/cart";
import { checkoutCart, retrieveStripeSessionId } from "../../store/cart/cartActions";
import CartItem from "../CartItem/CartItem";
import './Cart.css';

function Cart(){
    const {cartItems, isAuthenticated}=useSelector(state=>state.cart);
    const [totalPrice,setTotalPrice]=useState(0);
    const dispatch=useDispatch();

    useEffect(()=>{
        let price=0;
        if(cartItems.length){
            cartItems.forEach(item => {
                price=price+(item.price*item.qty);
            });
            setTotalPrice(price);
        }
    },[cartItems]);

    const handleCheckout=async (e)=>{
        e.preventDefault();
        try{
            const data=[];
            cartItems.forEach(item=>{
                data.push({productId:item.id,
                    qty:item.qty})
            });
            
            const session= await checkout(data);
            console.log('continuing here')
            console.log(session);
            await dispatch(retrieveStripeSessionId(session.id));
            //window.location=session.url;
        }catch(err){
            console.log('error thrown')
            console.log(err);
        }
    }
    return (
        
        <div className="cartPage">
            {
                isAuthenticated ?
            <div className="cartContainer">
                
                <h3 className="cartHeading">Your cart</h3>
                {
                    cartItems.length ? (
                <div className="cartItems">
                    {cartItems.map((cartItem)=>{
                        return <CartItem item={cartItem} key={cartItem.id}/>
                    })}
                </div>
                    )
                :
                (
                <div className="cartEmptyContainer">
                <h2 className="cartEmpty">Your cart is empty</h2>
                <Link to="/" className="homePage">Find Products</Link>
                </div>
                
                )
                }
                <div className="checkout">
                    <div className="total">
                        <h4 className="subtotal">Subtotal</h4>
                        <div className="totalAmount">${totalPrice}</div>
                    </div>
                    <Link className="checkoutBtn" to="/checkout" >Checkout</Link>
                </div>
            </div>
            :
            <div className="accessDenied">
                <h1 className="denied">You must be logged in to access your cart</h1>
                <div className="linksProductInfo">
                    <Link to='/signup' className="signupLink">Sign Up</Link>
                    <Link to='/login' className="loginLink">Log In</Link>
                </div>   
            </div>
            }
        </div>
       
        
    );
};

export default Cart;