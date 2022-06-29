import React, { useEffect } from "react";
import './Orders.css';
import { useDispatch, useSelector } from "react-redux";
import OrderItems from "../OrderItems/OrderItems";
import { fetchOrders } from "../../store/orders/orderActions";

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
                <h1>Your orders</h1>
                {
                    !orders.length ? null
                    :
                <table>
                    <tr>
                        <th>Order ID</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Price</th>
                    </tr>
                    {
                    orders.map(order=>{
                        return <OrderItems order={order}/>
                    })
                    }
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