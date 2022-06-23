import { createSlice } from "@reduxjs/toolkit";
import { createCart } from "./cartActions";


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
        }
    }
});

export default cartSlice.reducer;