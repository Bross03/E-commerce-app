import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './Admin.css';

function Admin() {
    const {user}=useSelector(state=>state.auth);
    const {products}=useSelector(state=>state.products);
    const [category,setCategory]=useState('');
    let isUserAdmin=user.id==1;
    
    const toggleActive=(e)=>{
        const newCategory=e.target.innerText;
        setCategory(newCategory);
        const activeElement=document.querySelector(".adminActive");
        activeElement.classList.remove('adminActive');
        e.target.classList.add("adminActive")
    }
    return(
       <div className="adminPage">
        {
            isUserAdmin ?
            <div className="admin">
                <div className="navigationAdmin">
                    <ul>
                        <li >
                            <a href="#" onClick={toggleActive} className="adminActive">
                                <span className="adminIcon"></span>
                                <span className="adminTitle">Products</span>
                            </a>
                        </li>
                        <li >
                            <a href="#" onClick={toggleActive} className="">
                                <span className="adminIcon"></span>
                                <span className="adminTitle">Orders</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={toggleActive} className="">
                                <span className="adminIcon"></span>
                                <span className="adminTitle">Users</span>
                            </a>
                        </li>
                    </ul>
                </div>  
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
            </div>
            :
            <div className="notAdmin">
                <h1>You are not allowed to access this page</h1>
                <Link to='/'>Return home</Link>
            </div>
        }
       </div>
    )
}

export default Admin;