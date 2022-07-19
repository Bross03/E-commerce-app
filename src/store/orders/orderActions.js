import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderItems, loadOrders } from '../../Api/order';

export const fetchOrders = createAsyncThunk(
    'order/loadOrders',
    async (param, thunkAPI) => {
      try {
        const response = await loadOrders();
        return {
          orders:response
        }
      } catch(err) {
        throw err;
      }
    }
  );

  export const getuserOrderItems = createAsyncThunk(
    'order/getOrderItems',
    async (id, thunkAPI) => {
      try {
        const response = await getOrderItems(id);
        return {
          orderItems:response
        }
      } catch(err) {
        throw err;
      }
    }
  );