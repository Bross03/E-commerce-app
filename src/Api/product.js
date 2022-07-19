import API from './client';

// API interface for loading products
export const fetchProducts = async (category) => {
  try {
    let response;
    if(category!='All Products'){
      response = await API.get(`products?category=${category}`);
    }else{
       response = await API.get(`products`);
    }
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}
export const fecthProductsByCategory=async (category)=>{
  try{
    const response = await API.get(`products?category=${category}`);
    return response.data;
  }catch(err){
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
export const updateProductById=async(id,data)=>{
  try{
    const response=await API.put(`products/${id}`,data)

    return response.data;
  }catch(err){
    throw err.response
  }
}
export const createProduct=async(data)=>{
  try{
    console.log(data);
    const response=await API.post(`products`,data)

    return response.data;
  }catch(err){
    throw err.response
  }
}