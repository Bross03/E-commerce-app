import "./Home.css";
import React, { useEffect, useState } from 'react';
import Products from "../Products/Products";
import { useDispatch, useSelector } from "react-redux";

import { loadProductList } from "../../store/products/productActions";

function Home(props){

    const dispatch=useDispatch();
    const [category,setCategory]=useState('All Products');
    const {products}=useSelector(state=>state.products);
    useEffect(()=>{
        async function load(){
        
        await dispatch(loadProductList(category));
    
        }
        load();
        return ()=>{

        };
    },[category]);

    const toggleMenu=()=>{
        const sidebar= document.querySelector(".sidebar");
        sidebar.classList.toggle('open');
    }
    const changeCategory=async (e)=>{
        const newCategory=e.target.innerText;
        setCategory(newCategory);
        toggleMenu();
    }
    return(
        <div>
            
            <div className="mainPage">
                
                    <aside className="sidebar">
                        <h3>Categories</h3>
                        <button className="close" onClick={toggleMenu}>X</button>
                        <ul>
                            <li><a href="#" onClick={changeCategory}>All Products</a></li>
                            <li><a href="#" onClick={changeCategory}>Shirts</a></li>
                            <li><a href="#" onClick={changeCategory}>Shorts</a></li>
                            <li><a href="#" onClick={changeCategory}>Sweaters</a></li>
                            <li><a href="#" onClick={changeCategory}>Long Sleeve Shirts</a></li>
                            
                        </ul>
                    </aside>
                <h1 className="category">{category}</h1>
                <Products products={products}/>
            </div>
        </div>
    )
}

export default Home;