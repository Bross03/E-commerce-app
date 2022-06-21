import React from "react";
import "./Product.css";

function Product(props){
    const {data}=props;
    return(
        <div className="product">
            <div className="image">

            </div>
            <h4 className="name">
                {data.name}
            </h4>
            <h4 className="price">
                ${data.price}
            </h4>
        </div>
    )
}

export default Product;