import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './CheckoutForm.css';
import { checkoutCart, createCart, findUserCart } from "../../store/cart/cartActions";
import { useNavigate} from 'react-router-dom';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

function CheckoutForm(){

    const dispatch=useDispatch();
    const stripe=useStripe();
    const elements=useElements()
    const {cart,cartItems}=useSelector(state=>state.cart)
    const navigate=useNavigate();

    async function processPayment(e) {
        e.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }
    
        try {
          const cardElement = elements.getElement(CardElement);
          
          const { token } = await stripe.createToken(cardElement);
    
          await dispatch(checkoutCart({cartId: cart.id, paymentInfo: token}));
          await dispatch(createCart());
          await dispatch(findUserCart());
          navigate('/orders');
        } catch(err) {
          throw err;
        }
      }
      const calculateTotal=()=>{
        let price=0;
        if(cartItems.length){
            cartItems.forEach(item => {
                price=price+(item.price*item.qty);
            });
            return price;
        }
        return;
      }
   
    return(
        <div className="checkoutFormPage">
          <div className="cartItems">
            {
              !cartItems ? null
              : 

              cartItems.map((cartItem)=>{
                return(
                  <div>
                    <div className="cartItemCheckout">
                      <h4 className="itemCheckout">{cartItem.name}</h4>
                      <p className="itemCheckoutQty">x{cartItem.qty}</p>
                      <div className="pricesItemCheckout">
                        <p className="totalPriceItemCheckout">total price: <span>${cartItem.price * cartItem.qty}</span></p>
                        <p className="individualPriceCheckout">unit price: <span>${cartItem.price}</span></p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            <div className="cartItemCheckout">
            <h2 className="totalPrice">Total: ${calculateTotal()}</h2>
            </div>
          </div>
          <div className="checkoutFormWrapper">
        <form onSubmit={processPayment} className="checkoutForm">
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className="pay-button" type="submit" >Pay</button>
        </form>
        </div>
        <script type="text/javascript" src="https://js.stripe.com/v2/"></script>
        </div>
    )
}

export default CheckoutForm;