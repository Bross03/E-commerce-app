import React, { useEffect, useState } from "react";
import {  useParams, useNavigate } from "react-router-dom";

import { getAllOrders, getOrderById, getOrderItemsById } from "../../Api/order";

function AdminOrderItems(){

    const navigate=useNavigate();
    const {orderId}=useParams();
    //const [orders, setOrders]=useState([]);
    const [orderItems,setOrderItems]=useState([]);
    const [order,setOrder]=useState({});

    async function fetchOrderItems(){
        const items= await getOrderItemsById(orderId);
        setOrderItems(items);
        return items;
    }
    async function fetchOrder(){
            const orderReceived= await getOrderById(orderId);
            setOrder(orderReceived)
            return orderReceived;
    }
    

    useEffect(()=>{
        fetchOrder();
        fetchOrderItems();
    },[orderId]);
    const calculateTotal=()=>{
        let price=0;
        if(orderItems.length){
            orderItems.forEach(item => {
                price=price+(item.price*item.qty);
            });
            return price;
        }
        return;
    }
    const dateManagment=()=>{
        var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        var date  = new Date(order.created);
        return date.toLocaleDateString("en-US", options); // Saturday, September 17, 2016
        }

    return (
        <div className="orderItemsPage">
           <div className="orderItemsContainer">
            {
                orderItems.length && order?
                <div>
                    <div className="orderHeader">
                        <p className="status">
                            Status: {order.status}
                        </p>
                        <p className="orderId">
                            ID: {order.id}
                        </p>
                        <p className="emailOrder">
                            Email: {order.email}
                        </p>
                        <p className="dateOrderItem">
                            Created: {dateManagment()}
                        </p>
                    </div>
                    <div className="listOfOrderItems">
                        {
                            orderItems.map(item=>{
                                return (
                                    <div className="cartItemCheckout">
                                        <div className="productInfoCheckout">
                                            <p className="itemCheckoutQty">{item.qty}x</p>
                                            <h4 className="itemCheckout">{item.name}</h4>
                                        </div>
                                        <p className="totalPriceItemCheckout">${item.price * item.qty}</p>
                                    </div>
                                )
                            })
                        }
                        <div className="cartItemCheckoutTotal">
                            <h2 className="totalPrice">Total: ${calculateTotal()}</h2>
                        </div>
                    </div>
                </div>
           :
           <h1>Order was empty</h1>
            }
           </div>
            <button onClick={() => navigate(-1)} className="returnOrders">Return to orders</button>
        </div>
    )
}

export default AdminOrderItems;