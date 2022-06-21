import React, { useState } from "react";
import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import { login } from "../../Api/auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth/authActions";

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
    const onSubmitLogin=async (e)=>{
        e.preventDefault();
        const message=document.querySelector('.message');
        try{
        if(checkIfEmpty()){
            return;
        }
        await dispatch(loginUser(data));
        
        navigate('/');
        }catch(err){
            message.classList.add('active');
            message.innerHTML='Email or password are incorrect';
        }
    }
    return (
        <div className="loginPage">
            <span className="message"></span>
            <div className="loginCard">
            <div className="title">
            <h2>Sign Up</h2>
            <p className="loginFormDescription">Fill in this form to login</p>
            </div>    
                <form className="loginForm" onSubmit={onSubmitLogin}>
                    
                    <input className="emailLogin" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input className="passwordLogin" 
                    type="password" placeholder="Password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    
                    
                    <button type="submit" className="submitButtonLogin">Log In</button>
                </form>
            </div>
            <p className="signup">Don't have an account?<Link to="/signup" className="signupLink">Sign up here.</Link></p>
        </div>
    )
}
export default Login;