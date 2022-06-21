import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isAuthenticated:false,
    error:false
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{}
});

export default authSlice.reducer;