import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadCart } from '../../Api/cart';

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