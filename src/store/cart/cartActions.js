import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkout, findCartById, getItemsOfUsersCart, loadCart } from '../../Api/cart';


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
    export const checkoutCart = createAsyncThunk(
      'cart/checkoutCart',
      async ({ cartId, paymentInfo }, thunkAPI) => {
        try {
          const response = await checkout(cartId, paymentInfo);
          console.log(response);
          console.log('heyhey')
          return {
            order: response
          }
        } catch(err) {
          throw err;
        }
      }
    );
    export const retrieveStripeSessionId= createAsyncThunk(
      'cart/stripeSessionId',
      async(id,thunkAPI)=>{
        try{
          return {
            stripeSessionId:id
          }
        }catch(err){
          throw err;
        }
      }
    )