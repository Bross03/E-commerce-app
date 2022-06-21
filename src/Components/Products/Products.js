import React from "react";
import Product from "../Product/Product";
import "./Products.css";
function Products(props){
    if (!props.products) return null;
    return(
        <div className="products">
            {
                props.products.map((product)=>{
                    return <Product data={product} key={product.id}/>
                })
            }
        </div>
    );
}
export default Products;