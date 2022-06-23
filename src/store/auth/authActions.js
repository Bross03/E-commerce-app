import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoggedIn, logout } from '../../Api/auth.js';

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (param, thunkAPI) => {
    try {
      const response = await isLoggedIn();

      return {
        isAuthenticated: true,
        user: response.data.user
      }
    } catch(err) {
      throw err;
    }
  }
);


export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (param, thunkAPI) => {
    try {
      await logout();
      return {
        user:{},
        isAuthenticated:false
      };
    } catch(err) {
      throw err;
    }
  }
);
