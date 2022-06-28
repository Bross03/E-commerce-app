import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import './Checkout.css';

const stripe=loadStripe("pk_test_51LF5hiBsvmer4HfahWWMH3edGo0zJWaIraUgkaPi7R956YrDeu9pEu1EkWWhQv4JTMHwIgo5oejV3KD6EHblZRm500mdWZFYaG")
function Checkout() {
    return(
        <Elements stripe={stripe} className="checkoutPage">
            <CheckoutForm/>
        </Elements>
    )
}

export default Checkout;