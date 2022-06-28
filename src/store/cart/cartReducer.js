import { createSlice } from "@reduxjs/toolkit";
import { createCart, findUserCart, findUserCartItems, retrieveStripeSessionId } from "./cartActions";


const initialState={
    cart:{},
    isAuthenticated:false,
    cartItems:[],
    stripeSessionId:''
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers:{
        [createCart.fulfilled]:(state,action)=>{
            const {cart,isAuthenticated}=action.payload;
            state.cart=cart;
            state.isAuthenticated=isAuthenticated;
        },
        [findUserCart.fulfilled]:(state,action)=>{
            const {cart,isAuthenticated,cartItems}=action.payload;
            state.cart=cart;
            state.isAuthenticated=isAuthenticated;
            state.cartItems=cartItems;
        },
        [retrieveStripeSessionId.fulfilled]:(state,action)=>{
            const {stripeSessionId}=action.payload;
            state.stripeSessionId=stripeSessionId;
        }
    }
});

export default cartSlice.reducer;