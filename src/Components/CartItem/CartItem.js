import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart, deleteItemFromCart } from "../../Api/cart";
import { findUserCart } from "../../store/cart/cartActions";
import './CartItem.css';

function CartItem(props){
    const product=props.item;
    const dispatch=useDispatch();
    const [inStock,setInStock]=useState(product.in_stock-product.qty)
    const navigate=useNavigate();
    
    useEffect(()=>{
        setInStock(product.in_stock-product.qty);
    },[product.qty]);

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
            if(product.qty>1){
            const data={
                productId:product.id,
                qty:-1
            }
            console.log(data);
            await addItemToCart(data);
            }else{
                const data={
                    productId:product.id
                }
                await deleteItemFromCart(data);
            }
            await dispatch(findUserCart());
        
        }catch(err){
            console.log(err);
        }
    }
    const deleteItem=async(e)=>{
        e.preventDefault();
        try{
            const data={
                productId:product.id
            }
            console.log(data);
            await deleteItemFromCart(data);
            await dispatch(findUserCart());
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="cartItem">
            <img src={require(`./../../Images/p${product.id}.jpg`)} alt="product image" className="imageCartItem"></img>
            <div className="aboutCartItem">
                <h2 className="titleCartItem">{product.name}:</h2>
                <p className="subtitleCartItem">In stock: 
                {
                inStock>=0?
                <span className="inStock"> Yes</span>
                :
                <span className="notInStock"> No</span>
                }
                </p>
            </div>
            <div className="counterCartItem">
                <div className="counterBtn" onClick={addItem}>+</div>
                <div className="quantityCartItem">{product.qty}</div>
                <div className="counterBtn" onClick={removeItem}>-</div>
            </div>
            <div className="priceCartItem">
                <p className="amountCartItem">${product.price}</p>
                <p className="removeCartItem" onClick={deleteItem}>Remove</p>
            </div>
        </div>
    )
}

export default CartItem;