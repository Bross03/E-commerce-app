import "./Home.css";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { fetchProducts } from "../../Api/product";
import Products from "../Products/Products";

function Home(props){

    const [products, setProducts]=useState([]);
    const [category,setCategory]=useState('All Products');

    useEffect(()=>{
        async function load(){
        const data= await fetchProducts();
        setProducts(data);
        console.log(products);
        }
        load();
        return ()=>{

        };
    },[]);
    
    const toggleMenu=()=>{
        const sidebar= document.querySelector(".sidebar");
        if(sidebar.classList.contains("open")){
            sidebar.classList.remove("open")
        }else{
        sidebar.classList.add("open")
        }
    }
    const changeCategory=(e)=>{
        const newCategory=e.target.innerText;
        setCategory(newCategory);
        toggleMenu();
    }
    return(
        <div>
            <nav>
                <div className="hero">
                    <button className="navbar hamburger" onClick={toggleMenu}>
                        &#9776;
                    </button>
                    <h2 className="navbar logo">Nile.com</h2>
                </div>
                <div className="links">
                    <Link to="/cart" className="navbar cartLink">Cart</Link>
                    <Link to="/login" className="navbar signinLink">Log in</Link>
                    <Link to='/signup' className="navbar signupLink">Sign up</Link>
                </div>
            </nav>
            <aside className="sidebar">
                <h3>Categories</h3>
                <button className="close" onClick={toggleMenu}>X</button>
                <ul>
                    <li><a href="#" onClick={changeCategory}>All Products</a></li>
                    <li><a href="#" onClick={changeCategory}>Women</a></li>
                    <li><a href="#" onClick={changeCategory}>Men</a></li>
                </ul>
            </aside>
            <h1 className="category">{category}</h1>
            <Products products={products}/>
        </div>
    )
}

export default Home;