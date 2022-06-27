import "./ProductInfo.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProductList, selectActiveProduct } from "../../store/products/productActions";
import { findUserCart } from "../../store/cart/cartActions";
import { addItemToCart } from "../../Api/cart";

function ProductInfo(){
    const {productId}=useParams();
    const dispatch=useDispatch();
    const {productSelected, products}=useSelector(state=>state.products);
    const {isAuthenticated}=useSelector(state=>state.auth);
    const [quantity,setQuantity]=useState(1);
    const navigate=useNavigate();

    const data={
        productId:productId,
        qty: quantity
    };

    useEffect(()=>{
        async function loadProduct(){
            if(products.length==0){
                await dispatch(loadProductList());
            }
            await dispatch(selectActiveProduct(productId));
        }
        loadProduct();
    },[productId])

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
        if(data.productId && data.qty){
            await addItemToCart(data);
        }
        await dispatch(findUserCart());
        navigate('/cart');
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            {
                 (productSelected.name) ?
                 (
                 <div className="productInfo">
                    <img src={require(`./../../Images/p${productSelected.id}.jpg`)} alt="product image" className="imageInfo"></img>
                    <div className="descrpition">
                        <h2 className="productTitle">{productSelected.name}</h2>
                        <h4 className="priceInfo">${productSelected.price}</h4>
                        <div className="ratings">reviews but we can figure that out later</div>
                        <div className="productDetails">
                            <h2>About this item:</h2>
                            <p className="descriptionProduct">{productSelected.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <div className="size">
                                <h2>Choose your size</h2>
                                <ul className="sizes">
                                    <li>XS</li>
                                    <li>S</li>
                                    <li>M</li>
                                    <li>L</li>
                                    <li>XL</li>
                                </ul>
                            </div>
                            <ul className="productDetailList">
                                <li>In stock:
                                    {
                                    productSelected.in_stock>0 ? 
                                    <span className="inStock"> Yes</span>
                                :
                                <span className="notInStock"> No</span>
                                }
                                    </li>
                                <li>Category: <span>{productSelected.category}</span></li>
                            </ul>
                        </div>
                        {
                           isAuthenticated ?
                            <form className="addToCart" onSubmit={handleSubmit}>
                                <label to="quantity">Quantity</label>
                                <input type="number" min="0" value={quantity} id="quantity" onChange={(e) => setQuantity(e.target.value)}></input>
                                <button type="submit">Add to cart</button>
                            </form>
                            :
                            (
                            <div className="mustLogin">
                                <h4>You must be logged in to add items to your cart</h4>
                                <div className="linksProductInfo">
                                    <Link to='/signup' className="signupLink">Sign Up</Link>
                                    <Link to='/login' className="loginLink">Log In</Link>
                                </div>
                            </div>
                            )
                        }
                    </div>
                 </div>
                 )
                 :
                 <p>doesnt exist</p> 
            }
        </div>
    )
}
export default ProductInfo;