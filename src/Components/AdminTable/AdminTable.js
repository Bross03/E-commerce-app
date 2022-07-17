import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../Api/order";
import { getAllUsers } from "../../Api/user";
import Order from "../Order/Order";

function AdminTable(props) {
    let isProductActive=props.element == 'Products';
    let isUsersActive=props.element == 'Users';
    let isOrdersActive=props.element == 'Orders';
    const [users,setUsers]=useState([]);
    const [orders,setOrders]=useState([]);

    const {products}=useSelector(state=>state.products);

    const getUsers=async()=>{
        const response=await getAllUsers();
        setUsers(response)
    }
    const getOrders=async()=>{
        const response=await getAllOrders();
        setOrders(response);
    }

    useEffect(()=>{
        if(isUsersActive){
            getUsers();
        }else if(isOrdersActive){
            getOrders()
        }
    },[props])
    return(
        <div>
            {
                isProductActive ?
                    <table>
                        <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            products.length?

                            products.map(product=>{
                            return <tr>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.description}</td>
                                </tr>
                            })
                            :
                            <td>
                            
                            </td>
                        }
                        </tbody>
                
                    </table>
                :
                <div>
                {
                    isUsersActive ?
                    <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Password</th>
                    </tr>
                    </thead>
                    <tbody>
                     {
                        users.length?

                        users.map(user=>{
                           return <tr>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.password}</td>
                            </tr>
                        })
                        :
                        <td>
                          
                        </td>
                     }
                    </tbody>
                
                    </table>
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
                        return <Order order={order} key={order.id} origin='admin'/>
                    })
                    }
                    </tbody>
                
                    </table>
                }
                </div>
            } 
        </div>
    )
}

export default AdminTable;