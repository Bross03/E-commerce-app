import React, { useEffect, useState } from "react";
import "./ProductUpdate.css";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { updateProductById } from "../../Api/product";

function ProductUpdate(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {products}=useSelector(state=>state.products);
    const [productNameSelected,setProductNameSelected]=useState('Select');
    const [product,setProduct]=useState({});
    const [newProdName,setNewProdName]=useState('');
    const [newProdPrice,setNewProdPrice]=useState('');
    const [newProdDescription,setNewProdDescription]=useState('');
    const [newProdCategory,setNewProdCategory]=useState('');
    const [newProdInstock,setNewProdInstock]=useState('');

    useEffect(()=>{
        async function loadProducts(){
            await dispatch(loadProducts());
        }
        loadProducts();
    },[])
    useEffect(()=>{
        const prod=products.filter((product)=>{
            return product.name==productNameSelected;
        })
        if(prod.length){
        setProduct(prod[0]);
        setNewProdName(prod[0].name);
        setNewProdPrice(prod[0].price);
        setNewProdDescription(prod[0].description);
        setNewProdInstock(prod[0].in_stock);
        setNewProdCategory(prod[0].category);
        }
    },[productNameSelected])

    const itemSelected=(event)=>{
        let x = event.target.value;
        setProductNameSelected(x);
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const message=document.querySelector('.message');
        try{
            if(Object.keys(product).length !== 0){
                const data={
                    "price":newProdPrice,
                    "name":newProdName,
                    "description":newProdDescription,
                    "category":newProdCategory,
                    "in_stock":newProdInstock
                }
                await updateProductById(product.id,data);

                message.classList.remove('active');
                navigate('/');
            }else{
                message.classList.add('active');
                message.innerHTML='You must select a product on the dropdown menu';
            }
        }catch(err){

        }

    }
    return (
    <div className="productUpdatePage">
        <span className="message"></span>
        <div className="updateCard">
                <div className="title">
                    <h2>Update Product</h2>
                    <p className="formDescription">Fill in this form to update the product</p>
                </div>    
                <form className="updateForm"  onSubmit={handleSubmit}>
                <label htmlFor="productsSelect">Choose a Product:</label>
                <select name="productsSelect" id="productsSelect" onChange={itemSelected} value={productNameSelected}>
                    <option value="select">Select</option>
                    {
                    products.map(product=>{
                        return <option value={product.name} key={product.id}>{product.name}</option>
                    })
                    }
                </select>
                <div className="shorterInputs">
                    <div  className="shortInput">
                        <label htmlFor="prodName">Product Name</label>
                        <input maxlength="50" id="prodName" placeholder={product?.name} value={newProdName} onChange={(e) => setNewProdName(e.target.value)}></input>
                    </div>
                    <div  className="shortInput">
                        <label htmlFor="prodPrice">Product Price</label>
                        <input type="number" id="prodPrice" placeholder={product?.price} value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)}></input>
                    </div>
                </div>
                <div className="shorterInputs">
                    <div  className="shortInput">
                        <label htmlFor="prodCategory">Product Category</label>
                        <input maxlength="50" id="prodCategory" placeholder={product?.category} value={newProdCategory} onChange={(e) => setNewProdCategory(e.target.value)}></input>
                    </div>
                    <div  className="shortInput">
                        <label htmlFor="prodInstock">In stock</label>
                        <input type="number" id="prodInstock" placeholder={product?.in_stock} value={newProdInstock} onChange={(e) => setNewProdInstock(e.target.value)}></input>
                    </div>
                </div>
                <label htmlFor="prodDescription">Product Description</label>
                <textarea maxlength="300" id="prodDescription" placeholder={product?.description} value={newProdDescription} onChange={(e) => setNewProdDescription(e.target.value)}></textarea>
                <button type="submit" className="submitButton">Update</button>
                </form>
        </div>
    </div>
    )
}

export default ProductUpdate;