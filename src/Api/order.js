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
export const getAllOrders=async ()=>{
    try{
        const response=await API.get('orders');
        return response.data;
        
    }catch(err){
        throw err.response.data;
    }
}
export const getOrderById=async (orderId)=>{
    try{
        const response=await API.get(`orders/${orderId}`);
        return response.data;
    }catch(err){
        throw err.response.data
    }
}
export const getOrderItemsById=async (orderId)=>{
    try{
        const response=await API.get(`orders/${orderId}/items`);
        return response.data;
    }catch(err){
        throw err.response.data
    }
}
