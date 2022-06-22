import { createAsyncThunk } from "@reduxjs/toolkit";
import {fetchProducts, getProductById} from './../../Api/product.js';

export const loadProductList = createAsyncThunk(
    'products/loadProducts',
    async (param, thunkAPI) => {
      try {
        const response = await fetchProducts();
        return {
          products: response
        }
      } catch(err) {
        throw err;
      }
    }
  );

  export const selectActiveProduct = createAsyncThunk(
    'products/selectProduct',
    async (id, thunkAPI) => {
      try {
        const response = await getProductById(id);
        return {
          product: response
        }
      } catch(err) {
        throw err;
      }
    }
  );