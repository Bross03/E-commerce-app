import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoggedIn, login, register } from '../../Api/auth.js';

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (param, thunkAPI) => {
    try {
      const response = await isLoggedIn();

      return {
        isAuthenticated: true,
        user: response.user
      }
    } catch(err) {
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, thunkAPI) => {
    try {
      const response = await login(data);
      return {
        user: response.data,
        isAuthenticated: true
      }
    } catch(err) {
      throw err;
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, thunkAPI) => {
    try {
      await register(data);
      return {};
    } catch(err) {
      throw err;
    }
  }
);
