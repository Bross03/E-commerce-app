import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectActiveProduct } from "../../store/products/productActions";
import "./Product.css";

function Product(props){
    const {data}=props;

    const navigate=useNavigate();
    const dispatch=useDispatch();
    //const {products}=useSelector(state=>state.products);
    const selectProduct=async (productId)=>{
        //await dispatch(selectActiveProduct(productId));
        console.log('aaaaaaaaaa');
        //navigate('/productinfo');
    }
    return(
        <div className="product" >
            <div className="image">

            </div>
            <h4 className="name">
                {data.name}
            </h4>
            <h4 className="price">
                ${data.price}
            </h4>
            <Link to={`/products/${data.id}`}>See more</Link>
        </div>
    )
}

export default Product;