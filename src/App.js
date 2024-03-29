import './App.css';
import React, { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import ProductInfo from './Components/ProductInfo/ProductInfo';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginStatus, logoutUser } from './store/auth/authActions';
import Cart from './Components/Cart/Cart';
import { createCart, findUserCart } from './store/cart/cartActions';
import Checkout from './Components/Checkout/Checkout';
import Orders from './Components/Orders/Orders';
import OrderItems from './Components/OrderItems/OrderItems';
import Admin from './Components/Admin/Admin';
import AdminOrderItems from './Components/AdminOrderItems/AdminOrderItems';
import ProductUpdate from './Components/ProductUpdate/ProductUpdate';
import NewProduct from './Components/NewProduct/NewProduct';

function App() {

    const location=useLocation();
   
    const isLocationHome=location.pathname=='/';

    const dispatch=useDispatch();
    const {isAuthenticated, user}= useSelector(state=>state.auth);
    const {isCartAuthenticated}=useSelector(state=>state.cart)
    const handleLogout=async ()=>{
      try{
        document.querySelector(".loaderWrapper").classList.add("active");
        window.scrollTo({
          top:0
        });
        await dispatch(logoutUser());
        document.querySelector(".loaderWrapper").classList.remove("active");
        toggleProfileMenu();
      }catch(err){
          return err;
      }
  }
  useEffect(() => {
    async function isLoggedIn() {
      try{
        await dispatch(checkLoginStatus());
        if(!isCartAuthenticated && isAuthenticated){
          {
            try{
              await dispatch(findUserCart());
            }catch(err){
              await dispatch(createCart());
            }
          }
        }
      }catch(err){
        return err;
      }
    }

     isLoggedIn();
  }, [dispatch]);

  const toggleProfileMenu=()=>{
    const toggleProfileDropMenu=document.querySelector('.dropMenu');
    toggleProfileDropMenu.classList.toggle('active');
  }
  const handleMyCart=async ()=>{
    if(!isCartAuthenticated && isAuthenticated){
      {
        try{
          await dispatch(findUserCart());
        }catch(err){

          await dispatch(createCart());
        }
      }
    }
    toggleProfileMenu();
  }
  const toggleMenu=()=>{
    const sidebar= document.querySelector(".sidebar");
    sidebar.classList.toggle('open');
    window.scrollTo({
      top:0,
      behavior:'smooth',
    });
}
  return (
      <div className="App">
         <div className='loaderWrapper'>
            <div className='loader'>
            </div>
          </div>
        <div className='body'>
        <nav>   
                {
                isLocationHome ?
                <div className="hero">
                    <button className="navbar hamburger" onClick={toggleMenu}>
                        &#9776;
                    </button>
                    <h2 className="navbar logo">Nile.com</h2>
                </div>
                :
                <Link to="/" className="navbar logoLink">Nile.com</Link>
                }
                {
                    isAuthenticated ? 
                <div className="action links">
                    <div className="profile" onClick={toggleProfileMenu}>
                        <h3>Hello {user.first_name}</h3>
                    </div>
                    <div className="dropMenu">
                        <ul>
                            <li onClick={handleMyCart}><img src="" /><Link to='/cart' className="dropMenuLink">My cart</Link></li>
                            <li onClick={toggleProfileMenu}><img src="" /><Link to='/orders' className="dropMenuLink">My orders</Link></li>
                            <li onClick={toggleProfileMenu}><img src="" /><Link to='/' className="dropMenuLink" onClick={handleLogout}>Logout</Link></li>
                            {
                              user.id==1 ? 
                              <li onClick={toggleProfileMenu}><img src="" /><Link to='/admin' className="dropMenuLink">Admin</Link></li>
                              :
                              <div></div>

                            }
                        </ul>
                    </div>
                </div>
                :
                <div className="links">
                    <Link to="/login" className="navbar signinLink">Log in</Link>
                    <Link to='/signup' className="navbar signupLink">Sign up</Link>
                </div>
                }
            </nav>
          <Routes >
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path='/products/:productId' element={<ProductInfo/>}/>
            <Route exact path='/cart' element={<Cart/>}/>
            <Route exact path='/checkout' element={<Checkout/>}/>
            <Route exact path='/orders' element={<Orders/>}/>
            <Route exact path='/orders/:orderId' element={<OrderItems />}/>
            <Route exact path='/admin' element={<Admin />}/>
            <Route exact path='/admin/orders/:orderId' element={<AdminOrderItems />}/>
            <Route exact path='/admin/products/update' element={<ProductUpdate />}/>
            <Route exact path='/admin/products/create' element={<NewProduct />}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
         
        </div>
      </div>
    
  );
}

export default App;
