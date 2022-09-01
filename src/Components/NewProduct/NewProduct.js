import React, { useState } from "react";
import "./NewProduct.css";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { createProduct} from "../../Api/product";

function NewProduct(){
    
    const navigate=useNavigate();

    const [prodName,setProdName]=useState('');
    const [prodPrice,setProdPrice]=useState('');
    const [prodDescription,setProdDescription]=useState('');
    const [prodCategory,setProdCategory]=useState('');
    const [prodInstock,setProdInstock]=useState('');
    //Classy, stylish, stunning. The newest product of the winter collection arrived and amazed everyone. A minimalistic design for these pants will guarantee to make you the centre of attention wherever you go 
    const checkIfEmpty=()=>{
        const message=document.querySelector('.message');
        if(!prodName){
            message.classList.add('active');
            message.innerHTML='Please enter the product name';
            return true;
        }else if(!prodPrice){
            message.classList.add('active');
            message.innerHTML='Please enter the product price';
            return true;
        }
        else if(!prodCategory){
            message.classList.add('active');
            message.innerHTML='Please enter the product category';
            return true;
        }
        else if(!prodDescription){
            message.classList.add('active');
            message.innerHTML='Please enter the product description';
            return true;
        }
        else if(!prodInstock){
            message.classList.add('active');
            message.innerHTML='Please enter the how many of this item are in stock';
            return true;
        }
        else{
            message.classList.remove('active');
            message.innerHTML='';
            return false;
        }
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const message=document.querySelector('.message');
        try{
            if(checkIfEmpty()){
                return;
            }
            const data={
                "price":prodPrice,
                "name":prodName,
                "description":prodDescription,
                "category":prodCategory,
                "in_stock":prodInstock
            }
            document.querySelector(".loaderWrapper").classList.add("active");
            await createProduct(data);
            document.querySelector(".loaderWrapper").classList.remove("active")

                message.classList.remove('active');
                navigate('/');
           
            
        }catch(err){

        }

    }
    return (
    <div className="productUpdatePage">
        <span className="message"></span>
        <div className="updateCard">
                <div className="title">
                    <h2>Create New Product</h2>
                    <p className="formDescription">Fill in this form to create a new product</p>
                </div>    
                <form className="updateForm"  onSubmit={handleSubmit}>
                <div className="shorterInputs">
                    <div  className="shortInput">
                        <label htmlFor="prodName">Product Name</label>
                        <input maxLength="50" id="prodName" placeholder='Name' value={prodName} onChange={(e) => setProdName(e.target.value)}></input>
                    </div>
                    <div  className="shortInput">
                        <label htmlFor="prodPrice">Product Price</label>
                        <input type="number" id="prodPrice" placeholder='Price' value={prodPrice} onChange={(e) => setProdPrice(e.target.value)}></input>
                    </div>
                </div>
                <div className="shorterInputs">
                    <div  className="shortInput">
                        <label htmlFor="prodCategory">Product Category</label>
                        <input maxLength="50" id="prodCategory" placeholder='Category' value={prodCategory} onChange={(e) => setProdCategory(e.target.value)}></input>
                    </div>
                    <div  className="shortInput">
                        <label htmlFor="prodInstock">In stock</label>
                        <input type="number" id="prodInstock" placeholder='In stock' value={prodInstock} onChange={(e) => setProdInstock(e.target.value)}></input>
                    </div>
                </div>
                <label htmlFor="prodDescription">Product Description</label>
                <textarea maxLength="300" id="prodDescription" placeholder='Description' value={prodDescription} onChange={(e) => setProdDescription(e.target.value)}></textarea>
                <button type="submit" className="submitButton">Update</button>
                </form>
        </div>
    </div>
    )
}

export default NewProduct;