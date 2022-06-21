import { createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus, loginUser, logoutUser, registerUser } from "./authActions";

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
        [loginUser.fulfilled]:(state,action)=>{
            const { isAuthenticated, user } = action.payload;
            state.isAuthenticated = isAuthenticated;
            state.user=user;
            state.error=null;
        },
        [checkLoginStatus.fulfilled]:(state,action)=>{
            const { isAuthenticated, user } = action.payload;
            state.isAuthenticated = isAuthenticated;
            state.user=user;
            
        },
        [logoutUser.fulfilled]:(state,action)=>{
            const {isAuthenticated,user}=action.payload;
            state.isAuthenticated=isAuthenticated;
            state.user=user;
            state.error=null;
        },
        [registerUser.fulfilled]:(state,action)=>{
            const { isAuthenticated, user } = action.payload;
            state.isAuthenticated = isAuthenticated;
            state.user=user;
            state.error=null;
        },
        [registerUser.rejected]:(state,action)=>{
            const error =action.error;
            state.error=error;
            state.isAuthenticated=false;
        },
        [loginUser.rejected]:(state,action)=>{
            const error=action.error;
            state.error=error;
            state.isAuthenticated=false;
        }
    }
});

export default authSlice.reducer;