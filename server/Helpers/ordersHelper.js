const dbQuery=require('../dbQueries.js');
const pgp = require('pg-promise')({ capSQL: true });
const moment=require('moment');
const util=require('../util/util.js');
const { user } = require('pg/lib/defaults.js');
const utilInstance=new util();

module.exports=class orderHelper{

    //creates new order
    async createOrder(total,user_id){
        try{
         
            const newOrderId=await utilInstance.createNewId('orders');
          
            const timeNow=moment.utc().toISOString();
            const data={
                "user_id": user_id.toString(),
                "id": newOrderId.toString(),
                "status":'Submitted',
                "total":total.toString(),
                "created": timeNow,
                "modified":timeNow
            };
            
            const query=pgp.helpers.insert(data,null,'orders');
            
            await dbQuery(query);
            const newOrder=await dbQuery('SELECT * FROM orders WHERE id=$1',[newOrderId]);
            
            await this.createOrderItems(user_id,newOrderId.toString());
            return newOrder.rows[0];

        }catch(err){
            return err;
        }
    };

    //create order items
    async createOrderItems(user_id, order_id){
        let id;
        let qty;
        let product_id;
        let data={}
        const statement='SELECT * FROM cart_items WHERE cart_id=$1;'
        const value=user_id;
        const cartItems=await dbQuery(statement,[value]);
        if(cartItems.rows?.length){
            
            for(let i=0;i<cartItems.rows.length;i++){
                
                id=await utilInstance.createNewId('order_items');
                qty=cartItems.rows[i].qty;
                product_id=cartItems.rows[i].product_id;
                data={
                    "id":id.toString(),
                    "order_id":order_id,
                    "qty":qty,
                    "product_id":product_id
                };
                const query=pgp.helpers.insert(data,null,'order_items');
             
                await dbQuery(query);

            }
            return null;
        }
    };

    //after order is created, cart is deleted so id is free for user to use
    async deleteCartAndCartItems(user_id){

        try{
        const queryCart=`DELETE FROM carts WHERE user_id=$1;`;
        const queryCartItems=`DELETE FROM cart_items WHERE cart_id=$1;`;

        await dbQuery(queryCartItems,[user_id]);
        await dbQuery(queryCart,[user_id]);
        
        return null;

        }catch(err){
            return err;
        }
    };

    //retrieves all orders
    async getAllOrders(){
        try{
        const statement=`SELECT orders.id, orders.total, orders.status,
        orders.created, orders.modified, users.email FROM orders
       JOIN users ON orders.user_id=users.id;`

        const orders=await dbQuery(statement);
        if(orders.rows?.length){
            return orders.rows;
        }else{
            return 0;
        }
        }catch(err){
            return err;
        }
    };

    //get order by order id
    async getOrderById(id){
        const order= await dbQuery(`SELECT orders.id, orders.total, orders.status,
        orders.created, orders.modified, users.email FROM orders, users WHERE orders.id=$1 AND users.id=orders.user_id;
        `, [id]);
        if(order.rows?.length){
            return order.rows[0];
        }
        return null;
    };

    //get orders by user id
    async getOrderByUserId(user_id){
        const order= await dbQuery(`SELECT orders.id, orders.total, orders.status,
         orders.created, orders.modified, users.email FROM orders
        JOIN users ON orders.user_id=$1 AND users.id=orders.user_id;`, [user_id]);
        if(order.rows?.length){
            return order.rows;
        }
        return null;
    };

    //updates order status
    async updateOrder(status,id){
        try{
            
            const data={
                "status":status,
                "modified":moment.utc().toISOString()
            };

            const condition= pgp.as.format("WHERE id = ${id};", {id});
            const query= pgp.helpers.update(data,null,'orders')+ " " +condition;
    
            await dbQuery(query);
            const updatedOrder=await dbQuery("SELECT * FROM orders WHERE id=$1;",[id]);
            
            if(updatedOrder.rows?.length){
                return updatedOrder.rows[0];
            }

            return null;

            }catch(err){
                return err;
            }
    }

    //checks if user has an order
    async doesUserHaveThisOrder(order_id,user_id){
        const exists=await dbQuery('SELECT status FROM orders WHERE orders.id=$1 AND orders.user_id=$2;',[order_id,user_id]);
        if(exists.rows.length){
            return true;
        }else{
            return false;
        }
    }

    //retrieves order item from specific order
    async getItemsFromUserOrder(order_id,user_id){
        
        if(user_id!=1){
        const exists= this.doesUserHaveThisOrder(order_id, user_id);
            if(!exists){
                return null;
            }
        }
        const statement=`SELECT products.name,
         order_items.qty,products.price FROM order_items, products WHERE
        order_items.product_id=products.id AND order_items.order_id=$1;`
        const orderItems=await dbQuery(statement,[order_id]);
        if(orderItems.rows?.length){
            return orderItems.rows;
        }
        return null;
    }

}