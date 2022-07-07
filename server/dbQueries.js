const pool= require('./db');


module.exports=async function dbQuery(query,params){  
    try{
        let result;
        if(params){
            result=await pool.query(query,params);
        }else{
            result=await pool.query(query)
        }
        return result;
    }catch(err){
        console.log(err);
        return err;
    }
    
}
