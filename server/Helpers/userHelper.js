const dbQuery=require('../dbQueries.js');
const util=require('../util/util.js')
const utilInstance= new util();
const pgp = require('pg-promise')({ capSQL: true });


module.exports=class userHelper{

    //find user by email
    async findUserByEmail(email){
        const user= await dbQuery("SELECT * FROM users WHERE email=$1", [email])
        if(user.rows?.length){
            return user.rows[0];
        }
        return null;
    };

    //find user by id
    async findUserById(id){
        const user=await dbQuery("SELECT * FROM users WHERE id=$1", [id])
        if(user.rows?.length){
            return user.rows[0];
        }
        return null;
    };

    //posts new user(register)
    async createUser(data){
        try{
        const newUserId=await utilInstance.createNewId('users');
        const stringNewId=newUserId.toString();
        data={...data, 'id': stringNewId};
        const query=pgp.helpers.insert(data, null, 'users');
        await dbQuery(query);
        const newUser=await dbQuery("SELECT * FROM users WHERE id=$1",[stringNewId])
        return newUser.rows[0];

        }catch(err){
            return err;
        }
    };

    //retrieves information about all users
    async getAllUsers(){
        const users=await dbQuery("SELECT * FROM users");
        return users.rows;
    };


    //updates information about user
    async updateUser(id, data){
        try{
            if(data.password){
                data.password=await utilInstance.passwordHash(data.password);
            }
            const condition= pgp.as.format("WHERE id = ${id};", {id});
            const query= pgp.helpers.update(data,null,'users')+ " " +condition;
            
            await dbQuery(query);
            const updatedUser=await dbQuery("SELECT * FROM users WHERE id=$1;",[id]);
            
            if(updatedUser.rows?.length){
                return updatedUser.rows[0];
            }
            return null;
    
        }catch(err){
            return err;
        }
    };

    //finds user by facebook id
    async findUserByFacebookId(id){
        try{
            const statement=`SELECT * FROM users WHERE facebook->> 'id'=$1`;
            const values=[id];
            const user=await dbQuery(statement, values);

            if(user.rows?.length){
                return user.rows[0]
            }
            return null;
            
        }catch(err){
            return err;
        }
    };
    
    //finds user by google id
    async findUserByGoogleId(id){
        try{
    
            const statement=`SELECT * FROM users WHERE google->> 'id'=$1`;
            const values=[id];
            const user=await dbQuery(statement, values);

            if(user.rows?.length){
                return user.rows[0]
            }
            return null;
            
        }catch(err){
            return err;
        }
    }
}