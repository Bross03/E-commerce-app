
const express=require('express');
const router=express.Router();
const productHelper=require('../Helpers/productHelper.js');
const productHelperInstance= new productHelper();

module.exports=(app)=>{

    //setting up router
    app.use('/api/products', router)
    
    //get all products or product by category
    router.get('/',async (req,res,next)=>{
        console.log('is this working')
        try{
        if(req.query.category){
            const products=await productHelperInstance.getProductsByCategory(req.query.category);
            res.status(200).send(products);
        }else{
            const products= await productHelperInstance.getAllProducts();
            res.status(200).send(products);
        }
        

        }catch(err){
            res.status(500).send(err);
        }
    });

    //get product by id
    router.get('/:productid', async (req,res,next)=>{
        const product=await productHelperInstance.findProductById(req.params.productid);
        if(product){
            res.send(product);
        }
        else{
        res.status(500).send('Product does not exist');
        }
    });

    //post new product
    router.post('/', async (req,res,next)=>{
        try{
            const data = req.body;
            const response = await productHelperInstance.createProduct(data);
            if(response){
            res.status(200).send(response);
            }else{
                res.status(400).send('Bad Request')
            }
        }catch(err){
            res.status(500).send(err);
        }
    });

    //update product
    router.put('/:productid', async (req,res,next)=>{
        try{
            if(req.session.passport?.user){
            let correctFormat=true;
            for(const i in req.body){
                if(i!="price" && i!="name" && i!="description" && i!="in_stock" && i!="category"){
                    correctFormat=false;
                }
            }
            if(isNaN(req.body.price)){
                correctFormat=false;
            }

            if(correctFormat){
                const result= await productHelperInstance.updateProduct(req.params.productid, req.body);
        
                if(result){
                    res.status(200).send(result);
                }else{
                    res.status(500).send("Product does not exist");
                }
            }else{
                res.status(400).send("Bad request");
            }
        }else{
            res.status(500).send('Only admins can access this path');
        }
        
        }catch(err){
            res.status(500).send(err)
        }
    })
    
}