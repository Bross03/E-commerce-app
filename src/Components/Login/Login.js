import React, { useState } from "react";
import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { checkLoginStatus} from "../../store/auth/authActions";
import { login } from "../../Api/auth";
import { createCart, findUserCart } from "../../store/cart/cartActions";

function Login(){

    const navigate=useNavigate();
    const dispatch=useDispatch();

   

    const [password,setPassword]=useState('');
    const [email, setEmail]=useState('');
    const data={
        "username":email,
        "password":password
    }

    const checkIfEmpty=()=>{
        const message=document.querySelector('.message');
        if(!email){
            message.classList.add('active');
            message.innerHTML='Please enter your email';
            return true;
        }else if(!password){
            message.classList.add('active');
            message.innerHTML='Please enter your password';
            return true;
        }else{
            message.classList.remove('active');
            message.innerHTML='';
            return false;
        }
    }
    const onSubmitLogin= async (e)=>{
        e.preventDefault();
        const message=document.querySelector('.message');
        try{
        if(checkIfEmpty()){
            return;
        }
        
        document.querySelector(".loaderWrapper").classList.add("active");
   
        
        await login(data);
        await dispatch(checkLoginStatus());
        await dispatch(createCart());
        await dispatch(findUserCart());
        document.querySelector(".loaderWrapper").classList.remove("active")
        message.classList.remove('active');
        navigate('/');
            
        }catch(err){
            document.querySelector(".loaderWrapper").classList.remove("active")
            message.classList.add('active');
            message.innerHTML='Email or password are incorrect';
        }
    }
    const facebookLogin=()=>{
        try{
        window.open('http://localhost:4000/api/auth/facebook','_self')
        }catch(err){
            console.log(err);
        }
    }
    const googleLogin=()=>{
        try{
        window.open('http://localhost:4000/api/auth/google','_self')
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="loginPage">
            <span className="message"></span>
            <div className="loginCard">
                <div className="title">
                    <h2>Log In</h2>
                    <p className="loginFormDescription">Fill in this form to log in</p>
                </div>    
                <form className="loginForm" onSubmit={onSubmitLogin}>
                    
                    <input className="longinput emailLogin" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input className="longinput passwordLogin" 
                    type="password" placeholder="Password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    
                    
                    <button type="submit" className="submitButtonLogin">Log In</button>
                </form>
                <h4>Or Log In with</h4>
                <div className="socialLogins">
                  <div className="facebookButton" onClick={facebookLogin}>Facebook</div>
                  <div className="googleButton" onClick={googleLogin}>Google</div>    
                </div>
            </div>
                <p className="signupText">Don't have an account? <Link to="/signup" className="signUpLink">Sign up here.</Link></p>
            <div className="wavesWrapper">
            <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg>
            <div class="content flex">
            </div>
            </div>
        </div>
    )
}
export default Login;