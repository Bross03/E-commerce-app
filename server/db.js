const { Pool} = require('pg/lib')
const {DB}=require('./config');


const pool= new Pool({
    host: DB.PGHOST,
    user: DB.PGUSER,
    port: DB.PGPORT,
    password: DB.PGPASSWORD,
    database: DB.PGDATABASE,
    max: 10
});



module.exports=pool;
