import { createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus, logoutUser } from "./authActions";

const initialState={
    user:{},
    isAuthenticated:false,
    error:null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:{
        [checkLoginStatus.fulfilled]:(state,action)=>{
            const { isAuthenticated, user } = action.payload;
            state.isAuthenticated = isAuthenticated;
            state.user=user;
            
        },
        [logoutUser.fulfilled]:(state,action)=>{
            const {isAuthenticated, user}=action.payload;
            state.isAuthenticated=isAuthenticated;
            state.user=user;
            state.error=null;
        },
        [checkLoginStatus.rejected]:(state,action)=>{
            const {isAuthenticated}=action.payload;
            state.isAuthenticated=isAuthenticated;
        },
        
    }
});

export default authSlice.reducer;