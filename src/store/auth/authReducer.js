import { createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus, loginUser } from "./authActions";

const initialState={
    user:{},
    isAuthenticated:false,
    error:false
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:{
        [loginUser.fulfilled]:(state,action)=>{
            const { isAuthenticated, user } = action.payload;
        state.isAuthenticated = isAuthenticated;
        state.user=user;
        },
        [checkLoginStatus.fulfilled]:(state,action)=>{
            const { isAuthenticated } = action.payload;
        state.isAuthenticated = isAuthenticated;
        }
    }
});

export default authSlice.reducer;