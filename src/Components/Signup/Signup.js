import "./Signup.css";
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLoginStatus } from "../../store/auth/authActions";

import { login, register } from "../../Api/auth";
import { loadCart } from "../../Api/cart";
import { createCart } from "../../store/cart/cartActions";

function Signup(){

    const navigate = useNavigate();
    const dispatch=useDispatch();

   

    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [email,setEmail]=useState('');
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [google, setGoogle]=useState({});
    const [facebook, setFacebook]=useState({});

    const data={
        'first_name':firstName,
        'last_name':lastName,
        'email':email,
        'password':password,
        'facebook':facebook,
        'google':google
    };
    const loginData={
        "username":email,
        "password":password
    }
    const checkIfEmpty=()=>{
        const message=document.querySelector('.message');
        if(!password){
            message.classList.add('active');
            message.innerHTML='Please enter your password';
            return true;
        }else if(!confirmPassword){
            message.classList.add('active');
            message.innerHTML='Please confirm your password';
            return true;
        }
        else if(!firstName){
            message.classList.add('active');
            message.innerHTML='Please enter your first name';
            return true;
        }
        else if(!lastName){
            message.classList.add('active');
            message.innerHTML='Please enter your last name';
            return true;
        }
        else if(!email){
            message.classList.add('active');
            message.innerHTML='Please enter your email';
            return true;
        }
        else{
            message.classList.remove('active');
            message.innerHTML='';
            return false;
        }
    }
    const onSubmitSignup=async (e)=>{
        e.preventDefault();
        const message=document.querySelector('.message');
        try{
            if(checkIfEmpty()){
                return;
            }
            if(password!=confirmPassword){
                message.classList.add('active');
                message.innerHTML='Passwords do not match';
                return;
            }
            await register(data);
            await login(loginData);
            await dispatch(checkLoginStatus());
            await dispatch(createCart());

            setEmail('');
            setConfirmPassword('');
            setPassword('');
            setFirstName('');
            setLastName('');
            navigate('/');

            return;
        }catch(err){
            
            message.classList.add('active');
            message.innerHTML=err;
        }
    };
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
    const githubLogin=()=>{
        try{
        window.open('http://localhost:4000/api/auth/github','_self')
        }catch(err){
            console.log(err);
        }
    }
    
    return(
        <div className="signUpPage">
            <span className="message"></span>
            <div className="signUpCard">
                <div className="title">
                    <h2>Sign Up</h2>
                    <p className="formDescription">Fill in this form to create an account</p>
                </div>    
                <form className="signupForm" onSubmit={onSubmitSignup}>
                    <div className="name">
                        <input className="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                        <input className="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                    </div>
                    <input className="longinput email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input className="longinput password" 
                    type="password" placeholder="Password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <input className="longinput passwordConfirm" 
                    type="password" placeholder="Confirm Password"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    
                    <button type="submit" className="submitButton">Register</button>
                </form>
                <h4>Or Sign Up with</h4>
                <div className="socialLogins">
                  <div className="facebookButton" onClick={facebookLogin}>Facebook</div>
                  <div className="googleButton" onClick={googleLogin}>Google</div>
                </div>
            </div>
            <p className="login">Already have an account?<Link to="/login" className="loginLink">Login here.</Link></p>
        </div>
    );
}

export default Signup;