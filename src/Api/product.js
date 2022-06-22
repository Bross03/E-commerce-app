import API from './client';

// API interface for loading products
export const fetchProducts = async () => {
  try {
    const response = await API.get(`products`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

export const getProductById=async(id)=>{
  try{
    const response=await API.get(`products/${id}`)

    return response.data;
  }catch(err){
    throw err.response
  }
}