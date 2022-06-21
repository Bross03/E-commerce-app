const express = require('express');
const router=express.Router();

const AuthHelper=require('../Helpers/authHelper.js')
const authHelperInstance=new AuthHelper();

module.exports=(app, passport)=>{

    //setting up router
    app.use('/api/auth', router)
    
    //registering new users
    router.post('/register', async (req, res, next) => {
        try{
            const data = req.body;
            let correctFormat=true;
            console.log(!data.hasOwnProperty('first_name'));
            console.log(!!data.hasOwnProperty('last_name'));
            console.log(!data.hasOwnProperty('password'));
            console.log(!data.hasOwnProperty('email'));
            if(!data.hasOwnProperty('first_name') || !data.hasOwnProperty('last_name') 
            || !data.hasOwnProperty('password') || !data.hasOwnProperty('email')){
                correctFormat=false;
            }
            if(correctFormat){
                const response = await authHelperInstance.register(data);
                if(response){
                    res.status(200).send(response);
                }else{
                    res.status(500).send("Email already in use");
                }
            }else{
                res.status(404).send('Bad request');
            }
        }catch(err){
            res.status(500).send(err)
        }
    });

    //login of registered users
    router.post('/login', passport.authenticate("local"), async (req,res,next)=>{
        try{
            const {username, password}=req.body;
            const response = await authHelperInstance.login({email:username, password});
            if(response){
                console.log('success');
                res.status(200).send(response);
            }else{
                res.status(500).send("Email or password are incorrect");
            }
        }catch(err){
            res.status(500).send(err);
        }
    });

    //loging out users
    router.get("/logout", (req, res) => {
        req.logout();
        res.send("logged out");
        //res.redirect('/auth/login');
      });
    
    
}