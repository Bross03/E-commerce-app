import API from './client';

export const loadOrders=async ()=>{
    try{
        const response=await API.get('orders/mine');
        return response.data;
        
    }catch(err){
        throw err.response.data;
    }
}

export const getOrderItems=async (id)=>{
    try{
        const response=await API.get(`orders/mine/${id}`);
        return response.data;
        
    }catch(err){
        throw err.response.data;
    }
}