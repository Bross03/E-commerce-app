import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CartItem from "../CartItem/CartItem";
import './Cart.css';

function Cart(){
    const {cartItems, isCartAuthenticated}=useSelector(state=>state.cart);
    const [totalPrice,setTotalPrice]=useState(0);
    const navigate=useNavigate();

    useEffect(()=>{
        let price=0;
        if(cartItems.length){
            cartItems.forEach(item => {
                price=price+(item.price*item.qty);
            });
            setTotalPrice(price);
        }
    },[cartItems]);

    const handleCheckoutButton=(e)=>{
        e.preventDefault();
        const message=document.querySelector('.messageCart');
        try{
            let allItemsAvailable=true;
            cartItems.forEach(item=>{
                if((item.in_stock-item.qty)<0){
                    allItemsAvailable=false;
                }
                return;
            })
            if(allItemsAvailable){
                message.classList.remove('active');
                navigate('/checkout');
            }else{
                message.classList.add('active');
                message.innerHTML='One or more items seem to be out of stock'
            }
        }catch(err){
            return err;
        }
    }
    
    return (
        
        <div className="cartPage">
            <span className="messageCart"></span>
            {
                isCartAuthenticated ?
            <div className="cartContainer">
                
                <div className="cartHeading">
                    <h3>Your cart:</h3>
                    {
                        cartItems.length ?
                    <Link to='/' className="headingLink">Continue Shopping</Link>   
                    :
                    <div>

                    </div>
                    }
                </div>
                {
                    cartItems.length ? (
                <div className="cartItemsOnCart">
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
                    <button className="checkoutBtn" onClick={handleCheckoutButton} >Checkout</button>
                </div>
            </div>
            :
            <div className="accessDenied">
                <h1 className="denied">You must be logged in to access your cart</h1>
                <div className="linksProductInfo">
                    <Link to='/signup' className="cartSignUpLink">Sign Up</Link>
                    <Link to='/login' className="cartLogInLink">Log In</Link>
                </div>   
            </div>
            }
            
        </div>
       
        
    );
};

export default Cart;