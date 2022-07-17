import API from './client';

export const getAllUsers=async ()=>{
    try{
        const response=await API.get('users');
        return response.data;
        
    }catch(err){
        throw err.response.data;
    }
}