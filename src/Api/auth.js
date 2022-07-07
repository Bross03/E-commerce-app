import API from './client';

export const register=async (data)=>{
    try{
        const response=await API.post('auth/register',data);
        console.log(response);
        
        return response.data;
        
    }catch(err){
        throw err.response.data;
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
        const response=await API.get('auth/loggedin');
        return response;
    }catch(err){
        throw err.response.data
    }
}
export const logout=async ()=>{
    try{
        const response=await API.get('auth/logout');
        return response;
    }catch(err){
        throw err.response;
    }
}
export const loginFacebook=async (data)=>{
    try{
        const response=await API.get('auth/facebook');
        return response;
    }catch(err){
        throw err.response.data
    }
}