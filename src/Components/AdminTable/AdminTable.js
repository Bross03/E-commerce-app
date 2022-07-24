import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../Api/order";
import { getAllUsers } from "../../Api/user";
import { loadProductList } from "../../store/products/productActions";
import Order from "../Order/Order";
import './AdminTable.css';

function AdminTable(props) {
    const dispatch=useDispatch();

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
        async function loadProducts(){
            if(!products.length){
            await dispatch(loadProductList('All Products'));
            }
        }
        loadProducts();
        if(isUsersActive){
            getUsers();
        }else if(isOrdersActive){
            getOrders()
        }
    },[props])
    return(
        <div>
        <div className="tableCard">
            {
                isProductActive ?
                <div className="productsTable">
                    <Link className="createProduct" to='/admin/products/create'>Create New Product</Link>
                    <table>
                        <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Update</th>
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
                                    <td><Link to='/admin/products/update' className="updateProduct">Update Product</Link></td>
                                </tr>
                            })
                            :
                            <td>
                            
                            </td>
                        }
                        </tbody>
                
                    </table>
                </div>
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
        </div>
    )
}

export default AdminTable;