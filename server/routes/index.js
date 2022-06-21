const userRouter=require('./user.js');
const productsRouter=require('./products.js');
const ordersRouter=require('./orders.js');
const cartRouter=require('./cart.js');
const authRouter=require('./auth.js');

//exporting all routers from a single file
module.exports=(app,passport)=>{
    userRouter(app);
    productsRouter(app);
    ordersRouter(app);
    cartRouter(app);
    authRouter(app,passport);
}