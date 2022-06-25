import React from "react";
import { useSelector } from "react-redux";
import Product from "../Product/Product";
import "./Products.css";
function Products(props){
    const {products}=useSelector(state=>state.products);
    // const navigate=useNavigate();
    // const dispatch=useDispatch();
    // const selectProduct=async (productId)=>{
    //     await dispatch(selectActiveProduct(productId));
    //     navigate('/productinfo');
    // }
    if (!products) return null;
    return(
        <div className="products">
            {
                products.map((product)=>{
                    return <Product data={product} key={product.id} />
                })
            }
        </div>
    );
}
export default Products;