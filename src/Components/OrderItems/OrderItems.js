import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './OrderItems.css';
import { useDispatch, useSelector } from "react-redux";
import { getuserOrderItems } from "../../store/orders/orderActions";
import { getOrderItems } from "../../Api/order";
function OrderItems(){
    const {orderId}=useParams();
    const {orders}=useSelector(state=>state.order);
    const [orderItems,setOrderItems]=useState([]);
    const [order,setOrder]=useState({});
    //const {orderItems}=useSelector(state=>state.order);

    //might have to make a call to the api directly and use react states 
    //having the problem where the first rendering does not load like the sign up and log in
    useEffect(()=>{
        async function fetchOrderItems(){
           const items= await getOrderItems(orderId);
           setOrderItems(items);
           return;
        }
        fetchOrderItems();
        if(orders.length){
            const selectedOrder=orders.filter(order=>{
                return order.id==orderId;
            })
            setOrder(selectedOrder);
        }
    },[]);
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
        var date  = new Date(order[0].created);
        return date.toLocaleDateString("en-US", options); // Saturday, September 17, 2016
        }

    return (
        <div className="orderItemsPage">
           <div className="orderItemsContainer">
            {
                orderItems.length && orders.length?
                <div>
                    <div className="orderHeader">
                        <p className="status">
                            Status: {order[0].status}
                        </p>
                        <p className="orderId">
                            ID: {order[0].id}
                        </p>
                        <p className="emailOrder">
                            Email: {order[0].email}
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
            <Link to="/orders" className="returnOrders">Return to orders</Link>
        </div>
    )
}

export default OrderItems;