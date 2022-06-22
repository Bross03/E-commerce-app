import { createSlice } from "@reduxjs/toolkit";
import { loadProductList, selectActiveProduct } from "./productActions";


const initialState={
    products:[],
    productSelected:{}
}

const productSlice=createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers:{
        [loadProductList.fulfilled]:(state,action)=>{
            const {products}=action.payload;
            state.products=products;
        },
        [selectActiveProduct.fulfilled]:(state,action)=>{
            const {product}=action.payload;
            state.productSelected=product;
        }
    }
})

export default productSlice.reducer;