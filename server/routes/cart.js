const express=require('express');
const router=express.Router();
const cartHelper=require('../Helpers/cartHelpers.js');
const cartHelperInstance= new cartHelper();
const orderHelper=require('../Helpers/ordersHelper.js');
const orderHelperInstance= new orderHelper();

module.exports=(app)=>{

    //setting up router
    app.use('/api/cart', router)
    
    //get specific cart of the logged in user
    router.get('/mine',async (req,res,next)=>{

        if(req.session.passport?.user){
            const cart = await cartHelperInstance.findCartById(req.session.passport.user);

            if(cart){
                res.send(cart);
            }else{
                res.status(500).send("cart not found");
            }

        }else{
            res.status(500).send('You must be logged in to access your cart');
        }

    });

    //get items from users cart
    router.get('/mine/items',async (req,res,next)=>{
        try{
            if(req.session.passport?.user){
                const cartItems=await cartHelperInstance.getAllItems(req.session.passport.user);
                res.send(cartItems);
            }else{
                res.status(500).send('You must be logged in to access your cart');
            }
        }catch(err){

        }
    })

    //post carts
    router.post('/', async (req,res,next)=>{
        try{

            if(req.session.passport?.user){                
                const response = await cartHelperInstance.createCart(req.session.passport.user);

                if(response){
                    res.status(200).send(response);
                }else{
                    res.status(500).send("A cart related to this user already exists");
                }

            }else{
                res.status(500).send('You must be logged in to create a cart');    
            }

        }catch(err){
            res.status(500).send(err);
        }
    });

    //post items in the users cart
    router.post('/mine',async (req,res,next)=>{
        try{
            if(req.session.passport?.user){
                const data=req.body;
                const result = await cartHelperInstance.addItemToCart(data, req.session.passport.user);
                if(result){
                res.status(200).send('Item successfully added to the cart');
                }else{
                    res.status(404).send('Bad Request');
                }
            }else{
                res.status(500).send('You must be logged in to add items to a cart')
            }

        }catch(err){
            res.status(500).send(err);
        }
    });

    
    router.post('/mine/checkout',async (req,res,next)=>{
     
        try{
            if(req.session.passport?.user){
                const cartExists=await cartHelperInstance.findCartById(req.session.passport.user);
                if(!cartExists){
                    res.status(500).send("Cart does not exist");
                }else{
                    const totalPrice=await cartHelperInstance.getTotalCartPrice(req.session.passport.user);
                    if(totalPrice==0){
                        res.status(500).send("Cart is empty");
                    }else{
                        
                        const newOrder=await orderHelperInstance.createOrder(totalPrice, req.session.passport.user);
                    
                        //delete cart and items
                        if(newOrder){
                            await orderHelperInstance.deleteCartAndCartItems(req.session.passport.user);
                        }
                        res.status(200).send("Successful checkout");
                    }
                }
            }else{
                res.status(500).send('You must be logged in to add items to checkout')
            }
        }catch(err){
            res.status(500).send(err)
        }
    });

    router.delete('/mine/:productId',async (req,res,next)=>{
        try{
            if(req.session.passport?.user){
                const result = await cartHelperInstance.deleteProductFromCart(req.params.productId, req.session.passport.user);
                
                if(result){
                res.status(200).send('Item successfully deleted from the cart');
                }else{
                    res.status(404).send('Bad Request');
                }
            }else{
                res.status(500).send('You must be logged in to delete items from your cart')
            }
        }catch(err){
            res.status(500).send(err);
        }
    })

    
}