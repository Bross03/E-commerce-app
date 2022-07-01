import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
//import Image from "./../../public/images";

function Product(props){
    const {data}=props;

    
    return(
        <div className="product" >
    
                <img src={require(`./../../Images/p${data.id}.jpg`)} alt="product image" className="image"></img>
            
            <h4 className="name">
                {data.name}
            </h4>
            <h4 className="price">
                ${data.price}
            </h4>
            <Link to={`/products/${data.id}`} className="seeMore">See More</Link>
        </div>
    )
}

export default Product;