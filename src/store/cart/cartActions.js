import { createAsyncThunk } from '@reduxjs/toolkit';
import { findCartById, getItemsOfUsersCart, loadCart } from '../../Api/cart';

// export const addItemToCart = createAsyncThunk(
//     'cart/addItem',
//     async (data, thunkAPI) => {
//       try {
//         const {productId, quantity}=data;

//         const response = await isLoggedIn();
  
//         return {
//           isAuthenticated: true,
//           user: response.data.user
//         }
//       } catch(err) {
//         throw err;
//       }
//     }
//   );
  export const createCart = createAsyncThunk(
    'cart/loadCart',
    async (param, thunkAPI) => {
      try {
        const response = await loadCart();
  
        return {
          cart:response,
          isAuthenticated: true,
        }
      } catch(err) {
        throw err;
      }
    }
  );
  export const findUserCart = createAsyncThunk(
    'cart/findCart',
    async (params, thunkAPI) => {
      try {
        const cart = await findCartById();
        const cartItems = await getItemsOfUsersCart();
        return {
          cart:cart,
          isAuthenticated: true,
          cartItems:cartItems
        }
      } catch(err) {
        throw err;
      }
    }
  );
  // export const addItemToCart = createAsyncThunk(
  //   'cart/addToCart',
  //   async (data, thunkAPI) => {
  //     try {
       
  //       await addItemToCart(data)
  //       return {
  //         cart:cart,
  //         isAuthenticated: true,
  //         cartItems:cartItems
  //       }
  //     } catch(err) {
  //       throw err;
  //     }
  //   }
  // );