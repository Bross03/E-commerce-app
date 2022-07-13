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
        
        await login(data);
        
        await dispatch(checkLoginStatus());
        await dispatch(createCart());
        await dispatch(findUserCart());
        
        message.classList.remove('active');
        navigate('/');
            
        }catch(err){
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
            <p className="signup">Don't have an account?<Link to="/signup" className="signUpLink">Sign up here.</Link></p>
        </div>
    )
}
export default Login;