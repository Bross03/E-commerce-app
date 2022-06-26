import { createAsyncThunk } from "@reduxjs/toolkit";
import {fecthProductsByCategory, fetchProducts, getProductById} from './../../Api/product.js';

export const loadProductList = createAsyncThunk(
    'products/loadProducts',
    async (category, thunkAPI) => {
      try {
        const response = await fetchProducts(category);
        return {
          products: response
        }
      } catch(err) {
        throw err;
      }
    }
  );
  // export const loadProductListWithCategory=createAsyncThunk(
  //   'products/loadProductsByCategory',
  //   async (category, thunkAPI) => {
  //     try {
  //       const response = await fecthProductsByCategory(category);
  //       return {
  //         products: response
  //       }
  //     } catch(err) {
  //       throw err;
  //     }
  //   }
  // );

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