const express= require('express');
const app= express();
const setup=require('./Setup');

const { PORT } = require('./config');

async function startServer(){
    app.get('/', (req, res ,next)=>{
        res.send('Welcome to an E-commerce App REST API');
    });
    
    setup(app);
    

    app.listen(PORT, ()=>{
        console.log('App listening on port '+ PORT);
    });
}
startServer();