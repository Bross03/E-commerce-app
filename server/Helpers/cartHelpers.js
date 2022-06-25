const dbQuery=require('../dbQueries.js');
const pgp = require('pg-promise')({ capSQL: true });
const moment=require('moment');
const productHelper=require('./productHelper.js');
const productHelperInstance=new productHelper();
const util=require('../util/util.js')
const utilInstance= new util();

module.exports=class cartHelper{
    
    async findCartById(user_id){
        const statement2=`SELECT * FROM carts WHERE id=$1`;
        const cart=await dbQuery(statement2,[user_id]);
        if(cart.rows?.length){
            return cart.rows;
        }
        return null;
    };

    async createCart(userId){
        const cart= await this.findCartById(userId);
        if(cart){
            return null;
        }
        const user_id = userId.toString();
        const timeNow=moment.utc().toISOString();
        const data={"user_id":user_id, 'id':user_id, 'created':timeNow, 'modified':timeNow };
        const query=pgp.helpers.insert(data, null, 'carts');
        await dbQuery(query);
        const newProduct= await dbQuery("SELECT * FROM carts where id=$1;",[userId]);
        if(newProduct.rows?.length){
            return newProduct.rows[0];
        }
        return null;
    };
    async getAllItems(user_id){
        const products=await dbQuery(`SELECT products.name, products.id, cart_items.id,
         cart_items.qty,products.price FROM cart_items, products WHERE
        cart_items.product_id=products.id AND cart_items.cart_id=$1;`,[user_id]);
        if(products.rows?.length){
            return products.rows;
        }else{
            return false;
        }
    }
    async cartHasItem(product_id, user_id){

        const product = await dbQuery("SELECT id FROM cart_items WHERE product_id=$1 AND cart_id=$2",[product_id, user_id]);
        if(product.rows?.length){
            return product.rows[0].id;
        }else{
            return false;
        }
    }

    async addItemToCart(data, user_id){
        const {productId,qty} =data;
        const id = await utilInstance.createNewId('cart_items');

        //const product_id=await productHelperInstance.getProductIdByName(name);

        const itemExists = await this.cartHasItem(productId, user_id);


        if(!itemExists){
            const cart_item ={
                "id":id,
                "product_id":productId,
                "cart_id":user_id,
                "qty": qty
            };
            if(!id || ! productId || !user_id ||!qty){
                return null;
            };

            const timeNow=moment.utc().toISOString();
            const cartUpdate={
                "modified": timeNow
            };
           
            const condition=pgp.as.format("WHERE id = ${user_id};", {user_id});

            const queryCart= pgp.helpers.update(cartUpdate,null,'carts')+ " " +condition;
            
            await dbQuery(queryCart);
            const queryCartItems=pgp.helpers.insert(cart_item,null,'cart_items');
            await dbQuery(queryCartItems);
            const createdCartItem=await dbQuery("SELECT * FROM cart_items WHERE id=$1;",[id]);
            if(createdCartItem.rows?.length){
                return createdCartItem.rows[0];
            }else{
                return null;
            }
        }else{
            const result=await dbQuery("SELECT qty FROM cart_items WHERE id=$1;", [itemExists]);
            const qtyNew=result.rows[0].qty+parseInt(qty);
            const condition = pgp.as.format("WHERE id = ${itemExists};", {itemExists});
            
            const quantityUpdate={
                'qty':qtyNew
            };
            const query = pgp.helpers.update(quantityUpdate,null,'cart_items')+ " " +condition;
            const createdCartItem= await dbQuery(query);
            return createdCartItem;
        }
    };
    async getTotalCartPrice(user_id){
        const statement=`SELECT qty, product_id FROM cart_items WHERE cart_id=$1`;
        const result =await dbQuery(statement,[user_id]);
        let sum=0;
        for(let i=0;i<result.rows.length;i++){
            const priceItem= await productHelperInstance.getPriceById(result.rows[i].product_id);
            sum = sum + (priceItem*result.rows[i].qty);
        }
        return sum;
    };
}
