import React from "react";
import { Link } from "react-router-dom";
import './OrderItems.js';

function OrderItems(props){
    const order=props.order;
    const dateManagment=()=>{
        var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        var date  = new Date(order.created);
        return date.toLocaleDateString("en-US", options); // Saturday, September 17, 2016
        }
    return(
        <tr onClick={dateManagment}>
            <td>{order.id}</td>
            <td>{order.email}</td>
            <td>{
                dateManagment()
            }</td>
            <td>{order.status}</td> 
            <td>${order.total}</td> 
            <td><Link to={`/orders/${order.id}`}>See order</Link></td>             
        </tr>
    )
}
export default OrderItems;