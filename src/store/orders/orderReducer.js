import { createSlice } from "@reduxjs/toolkit";
import { checkoutCart } from "../cart/cartActions";
import { fetchOrders } from "./orderActions";

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
            state.orders=[...state.orders, order];
        },
        [fetchOrders.fulfilled]:(state,action)=>{
            const {orders}=action.payload;
            state.orders=orders;
        }
    }
});

export default orderSlice.reducer;