import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Admin.css';
import AdminTable from "../AdminTable/AdminTable";

function Admin() {
    const {user}=useSelector(state=>state.auth);
    const [category,setCategory]=useState('Products');

    let isUserAdmin=user?.id==1;
    useEffect(()=>{
        if(isUserAdmin){
        document.querySelector(".adminProduct").classList.add('adminActive');
        }
    },[])
    const toggleActive=(e)=>{
        const newCategory=e.target.innerText;
        const activeElement=document.querySelector(".adminActive");
        setCategory(newCategory);
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
                            <a href="#" onClick={toggleActive} id="productTag" className="adminProduct">
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
                <AdminTable element={category}/>
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