import API from './client';

export const addItem=async (data)=>{
    try{
        const response=await API.post('cart/mine',data);
        console.log(response);
        return response.data;
        
    }catch(err){
        throw err.response.data;
    }
}
export const loadCart=async ()=>{
    try{
        const response=await API.post('cart');
        console.log(response);
        return response.data;
        
    }catch(err){
        throw err.response.data;
    }
}