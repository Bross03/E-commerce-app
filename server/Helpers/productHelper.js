const dbQuery=require('../dbQueries.js');
const pgp = require('pg-promise')({ capSQL: true });
const util=require('../util/util.js');
const utilInstance=new util();

module.exports=class productHelper{

    //finds products by Id
    async findProductById(id){
        const product= await dbQuery("SELECT * FROM products WHERE id=$1", [id]);
        if(product.rows?.length){
            return product.rows[0];
        }
        return null;
    };

    //retrieves product id by name
    async getProductIdByName(name){
        const productId= await dbQuery("SELECT id FROM products WHERE name=$1", [name])
        if(productId.rows?.length){
            return productId.rows[0].id;
        }
        return null;
    };

    //gets all products
    async getAllProducts(){
        const products=await dbQuery("SELECT * FROM products");
        return products.rows;
    };

    //post new product
    async createProduct(data){
        try{
        const newId = await utilInstance.createNewId('products');
        const stringNewId=newId.toString();
        data={...data, 'id': stringNewId};
        if(data.price && data.name && data.description && data.category && data.in_stock){
        const query=pgp.helpers.insert(data, null, 'products');
        await dbQuery(query);
        const newProduct= await this.findProductById(newId);
        return newProduct;
        }else{
            return null;
        }
        }catch(err){
            return err;
        }
    };

    //update product
    async updateProduct(id, data){
        try{
        const condition= pgp.as.format("WHERE id = ${id};", {id});
        const query= pgp.helpers.update(data,null,'products')+ " " +condition;
        await dbQuery(query);
        const updatedProduct=await dbQuery("SELECT * FROM products WHERE id=$1;",[id]);
            
            if(updatedProduct.rows?.length){
                return updatedProduct.rows[0];
            }

        return null;

        }catch(err){
            return err;
        }
    };
    

    //retrieve product price by id
    async getPriceById(id){
        try{
            const statement=`SELECT price FROM products WHERE id=$1`;
            const price=await dbQuery(statement,[id]);
            if(price.rows?.length){
               
                const intPrice=parseInt(price.rows[0].price);
                return intPrice;

            }else{
                return null;
            }
        }catch(err){
            return err;
        }
    }

    //get list of products by category
    async getProductsByCategory(category){
        try{
            const statement=`SELECT * FROM products WHERE category LIKE $1;`;
            const products= await dbQuery(statement,[`%${category}%`]);
            if(products.rows?.length){
                return products.rows;
            }else{
                return null;
            }
        }catch(err){
            return err;
        }
    }
}