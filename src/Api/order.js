import API from './client';

export const loadOrders=async ()=>{
    try{
        const response=await API.get('orders/mine');
        console.log(response);
        return response.data;
        
    }catch(err){
        throw err.response.data;
    }
}

export const getOrderItems=async (id)=>{
    try{
        const response=await API.get(`orders/mine/${id}`);
        console.log(response);
        return response.data;
        
    }catch(err){
        throw err.response.data;
    }
}