import { createSlice } from "@reduxjs/toolkit";
import { checkoutCart } from "../cart/cartActions";
import { fetchOrders, getuserOrderItems } from "./orderActions";

const initialState={
    order:{},
    orders:[],
    orderItems:[]
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
        },
        [getuserOrderItems.fulfilled]:(state,action)=>{
            const {orderItems}=action.payload;
            state.orderItems=orderItems;
        }
    }
});

export default orderSlice.reducer;