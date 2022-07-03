import React, { useEffect } from "react";
import './Orders.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/orders/orderActions";
import Order from "../Order/Order";

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
                    {/* <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                        
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                    </tr> */}
                </table>
                    
                }
            </div>
        </div>
    )
}
export default Orders;