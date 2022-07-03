const express=require('express');
const router=express.Router();
const orderHelper=require('../Helpers/ordersHelper.js');
const orderHelperInstance=new orderHelper();

module.exports=(app)=>{

    //setting up router
    app.use('/api/orders', router)
    
    //get all orders
    router.get('/',async (req,res,next)=>{
        try{
        const orders= await orderHelperInstance.getAllOrders();
        res.status(200).send(orders);
        }catch(err){
            res.status(500).send(err);
        }
    });
    
    router.get('/mine', async (req,res,next)=>{
        if(req.session.passport?.user){
            const orders=await orderHelperInstance.getOrderByUserId(req.session.passport.user);
            if(orders){
                res.send(orders);
            }else{
                console.log('orders dont exist');
                res.status(404).send('Orders not fond');
            }
        }else{
            console.log('not logged in?');
            res.status(500).send("You must be logged in to access this path");
        }
    });

    //get items of a specific user order
    router.get('/mine/:id', async (req,res,next)=>{
        if(req.session.passport?.user){
            const items=await orderHelperInstance.getItemsFromUserOrder(req.params.id, req.session.passport.user);
            console.log('yoyoyoyoyooyoy')
            console.log(items);
            if(items){
                res.send(items);
            }else{
                res.status(404).send('Order was empty');
            }
        }else{
            
            res.status(500).send("You must be logged in to access this path");
        }
    })
    
    //get a specific order
    router.get('/:id',async (req,res,next)=>{
        const order=await orderHelperInstance.getOrderById(req.params.id);
        if(order){
            res.send(order);
        }
        else{
        res.status(500).send('Order does not exist');
        }
    });

    //get all orders from an user
    router.get('/user/:id', async (req,res,next)=>{
        const orders=await orderHelperInstance.getOrderByUserId(req.params.id);
        if(orders){
            res.send(orders);
        }else{
            res.status(500).send('User does not have any orders');
        }
    });
    
    //update order status
    router.put('/:id', async (req,res,next)=>{
       const {status}=req.body;
       if(req.body.total || req.body.id ||req.body.user_id || req.body.created){
           res.status(404).send("Bad Request")
       }else{
            const updatedOrder=await orderHelperInstance.updateOrder(status,req.params.id);
            if(updatedOrder){
                res.send(updatedOrder);
            }else{
                res.status(500).send("Order does not exist");
            }
        }
    });

    
}