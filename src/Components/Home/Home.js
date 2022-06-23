import "./Home.css";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { fetchProducts } from "../../Api/product";
import Products from "../Products/Products";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth/authActions";
import { loadProductList } from "../../store/products/productActions";

function Home(props){

    const dispatch=useDispatch();
   // const [products, setProducts]=useState([]);
    const [category,setCategory]=useState('All Products');
    const {products}=useSelector(state=>state.products);
    useEffect(()=>{
        async function load(){
        await dispatch(loadProductList());
        }
        load();
        return ()=>{

        };
    },[]);

    const toggleMenu=()=>{
        const sidebar= document.querySelector(".sidebar");
        sidebar.classList.toggle('open');
    }
    const changeCategory=(e)=>{
        const newCategory=e.target.innerText;
        setCategory(newCategory);
        toggleMenu();
    }
    return(
        <div>
            {/* <nav>
                <div className="hero">
                    <button className="navbar hamburger" onClick={toggleMenu}>
                        &#9776;
                    </button>
                    <h2 className="navbar logo">Nile.com</h2>
                </div>
                {
                    isAuthenticated ? 
                <div className="action links">
                    <div className="profile" onClick={toggleProfileMenu}>
                        <h3>Hello {user.first_name}</h3>
                    </div>
                    <div className="dropMenu">
                        <ul>
                            <li><img src="" /><Link to='/cart' className="dropMenuLink">My cart</Link></li>
                            <li><img src="" /><Link to='/orders' className="dropMenuLink">My orders</Link></li>
                            <li><img src="" /><Link to='/' className="dropMenuLink" onClick={handleLogout}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
                :
                <div className="links">
                    <Link to="/login" className="navbar signinLink">Log in</Link>
                    <Link to='/signup' className="navbar signupLink">Sign up</Link>
                </div>
                }
            </nav> */}
            <div className="mainPage">
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
        </div>
    )
}

export default Home;