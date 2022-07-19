import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Product from "../Product/Product";
import "./Products.css";
function Products(props){
    const {products}=useSelector(state=>state.products);
    return(
        <div className="products">
            {
                products.length?
                products.map((product)=>{
                    return <Product data={product} key={product.id} />
                })
                :
                <Fragment>
                    <div className="productLoader">
                        <div className="imageLoad"></div>
                        <div className="nameLoad"></div>
                        <div className="priceLoad"></div>
                        <div className="linkLoad"></div>
                    </div>
                    <div className="productLoader">
                        <div className="imageLoad"></div>
                        <div className="nameLoad"></div>
                        <div className="priceLoad"></div>
                        <div className="linkLoad"></div>
                    </div>
                    <div className="productLoader">
                        <div className="imageLoad"></div>
                        <div className="nameLoad"></div>
                        <div className="priceLoad"></div>
                        <div className="linkLoad"></div>
                    </div>
                    <div className="productLoader">
                        <div className="imageLoad"></div>
                        <div className="nameLoad"></div>
                        <div className="priceLoad"></div>
                        <div className="linkLoad"></div>
                    </div>
                    <div className="productLoader">
                        <div className="imageLoad"></div>
                        <div className="nameLoad"></div>
                        <div className="priceLoad"></div>
                        <div className="linkLoad"></div>
                    </div>
                    <div className="productLoader">
                        <div className="imageLoad"></div>
                        <div className="nameLoad"></div>
                        <div className="priceLoad"></div>
                        <div className="linkLoad"></div>
                    </div>
                    
                </Fragment>
            }
        </div>
    );
}
export default Products;