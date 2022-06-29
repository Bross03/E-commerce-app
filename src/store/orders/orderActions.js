import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadOrders } from '../../Api/order';

export const fetchOrders = createAsyncThunk(
    'order/loadOrders',
    async (param, thunkAPI) => {
      try {
        const response = await loadOrders();
        console.log('hehehehhehe');
        console.log(response);
        return {
          orders:response
        }
      } catch(err) {
        throw err;
      }
    }
  );