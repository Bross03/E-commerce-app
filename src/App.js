
import './App.css';
import React from 'react';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import ProductInfo from './Components/ProductInfo/ProductInfo';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './store/auth/authActions';
import Cart from './Components/Cart/Cart';

function App() {
    const location=useLocation();
   
    const isLocationHome=location.pathname=='/';

    const dispatch=useDispatch();
    const {isAuthenticated, user}= useSelector(state=>state.auth)
    const handleLogout=async ()=>{
      try{
      await dispatch(logoutUser());
      toggleProfileMenu();
      }catch(err){
          return err;
      }
  }
  const toggleProfileMenu=()=>{
    const toggleProfileDropMenu=document.querySelector('.dropMenu');
    toggleProfileDropMenu.classList.toggle('active');
  }
  const toggleMenu=()=>{
    const sidebar= document.querySelector(".sidebar");
    sidebar.classList.toggle('open');
}
  return (
      <div className="App">
        <body>
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
                <Link to="/" className="navbar logo">Nile.com</Link>
                }
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
            </nav>
          <Routes >
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='products/:productId' element={<ProductInfo/>}/>
            <Route exact path='/cart' element={<Cart/>}/>
          </Routes>
        </body>
      </div>
    
  );
}

export default App;
