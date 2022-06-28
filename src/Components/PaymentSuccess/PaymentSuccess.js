import React from "react";
import { useSelector } from "react-redux";
import './PaymentSuccess.css';

function PaymentSuccess() {
    const {stripeSessionId}=useSelector(state=>state.cart);
    
    return (
        <div className="paymentSuccessPage">
            <h1>hey</h1>
        </div>
    )
}

export default PaymentSuccess;