const bcrypt=require('bcrypt');
const saltRounds=10;
const dbQuery=require('../dbQueries.js');

module.exports=class util{
    async passwordHash(password){
        try{
            const salt=await bcrypt.genSalt(saltRounds);
            return await bcrypt.hash(password, salt);
        }catch(err){
            console.log(err);
        }
        return null;
    };

    async comparePasswords(password, hash){
        try{
            const matchFound= await bcrypt.compare(password, hash);
            return matchFound;
        }catch(err){
            console.log(err);
        }
        return false;
    };
    async createNewId(table){
        // const emptyStatement=`SELECT CASE WHEN EXISTS (SELECT * FROM ${table} LIMIT 1) THEN 1 ELSE 0 END;`
        // const isEmpty=await dbQuery(emptyStatement)
        // console.log(isEmpty);
        // if(isEmpty==1){
        const statement=`SELECT id FROM ${table} WHERE id=$1;`;
        let idToTry=1;
        let foundId= await dbQuery(statement,[idToTry]);
        
        while(foundId.rows[0]?.id){
            idToTry++;
            foundId=await dbQuery(statement,[idToTry]);
        }
        return idToTry;
        // }else{
        //     return 1;
        // }
    };
}