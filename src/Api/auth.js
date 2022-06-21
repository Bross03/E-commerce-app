import API from './client';

export const register=async (data)=>{
    try{
        const response=await API.post('auth/register',data);
        return response;
    }catch(err){
        throw err.response.data
    }
}

export const login=async (data)=>{
    try{
        const response=await API.post('auth/login',data);
        return response;
    }catch(err){
        throw err.response.data
    }
}

export const isLoggedIn=async ()=>{
    try{
        const response=await API.get('loggedin');
        return response;
    }catch(err){
        throw err.response.data
    }
}