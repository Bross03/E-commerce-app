import React, { useEffect } from "react";
import './Orders.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/orders/orderActions";
import Order from "../Order/Order";
import { Link } from "react-router-dom";

function Orders(){

    const {orders}=useSelector(state=>state.order);
    const dispatch=useDispatch();

    useEffect(()=>{
        async function updateOrders(){
            await dispatch(fetchOrders());
        }
        updateOrders();

    },[]);
    return(
        <div className="ordersPage">
            <Link to="/" className="returnHome">Return Home</Link>
            <div className="ordersWrapper">
                <div className="ordersContainer">
                <h1 className="ordersTableTitle">Your orders</h1>
                {
                    !orders.length ? null
                    :
                <table>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Full Order</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    orders.map(order=>{
                        return <Order order={order} key={order.id}/>
                    })
                    }
                    </tbody>
                </table>
                    
                }
            </div>
            </div>
        </div>
    )
}
export default Orders;