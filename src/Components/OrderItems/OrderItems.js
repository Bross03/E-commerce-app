import React from "react";
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
            <td>{order.user_id}</td>
            <td>{
                dateManagment()
            }</td>
            <td>{order.status}</td> 
            <td>${order.total}</td>              
        </tr>
    )
}
export default OrderItems;