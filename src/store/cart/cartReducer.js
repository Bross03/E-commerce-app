import { createSlice } from "@reduxjs/toolkit";
import { createCart, findUserCart, findUserCartItems } from "./cartActions";


const initialState={
    cart:{},
    isAuthenticated:false,
    cartItems:[]
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
        }
    }
});

export default cartSlice.reducer;