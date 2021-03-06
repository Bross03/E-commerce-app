import API from './client';

export const addItem=async (data)=>{
    try{
        const response=await API.post('cart/mine',data);
        return response.data;
        
    }catch(err){
        throw err.response.data;
    }
}
export const loadCart=async ()=>{
    try{
        const response=await API.post('cart');
        return response.data;
        
    }catch(err){
        throw err.response.data;
    }
}
export const findCartById=async()=>{
    try{
        const response=await API.get('cart/mine');
        return response.data[0];
    }catch(err){
     
        throw err.response.data;
    }
}
export const getItemsOfUsersCart=async()=>{
    try{
        const response=await API.get('cart/mine/items');

        return response.data;
    }catch(err){
        throw err.response.data;
    }
}
export const addItemToCart=async(data)=>{
    try{
        const response=await API.post('cart/mine',data);
        return response.data[0];
    }catch(err){
        throw err.response.data;
    }
}
export const deleteItemFromCart=async(data)=>{
    try{
        const response=await API.delete(`cart/mine/${data.productId}`);
        return response.data[0];
    }catch(err){
        throw err.response.data;
    }
}
export const checkout = async (cartId, paymentInfo) => {
    try {
      const response = await API.post(`cart/mine/checkout`, { cartId, paymentInfo });
      return response.data;
  
    } catch(err) {
      throw err.response.data;
    }
  }
export const checkoutSuccess=async(data)=>{
    try{
        const response=await API.post(`cart/mine/checkout-success`,data);
        return response.data;
    }catch(err){
        throw err.response.data
    }
}