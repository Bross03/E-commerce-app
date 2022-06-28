import { createSlice } from "@reduxjs/toolkit";
import { checkoutCart } from "../cart/cartActions";

const initialState={
    order:{},
    orders:[]
}

const orderSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{},
    extraReducers:{
        [checkoutCart.fulfilled]:(state,action)=>{
            const {order}=action.payload;
            state.order=order;
            state.orders=[...orders, order];
        }
    }
});

export default orderSlice.reducer;