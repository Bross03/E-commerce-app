const express = require('express');
const router=express.Router();

const AuthHelper=require('../Helpers/authHelper.js')
const authHelperInstance=new AuthHelper();

const userHelper=require('../Helpers/userHelper')
const userHelperInstance= new userHelper();

module.exports=(app, passport)=>{

    //setting up router
    app.use('/api/auth', router)
    
    //registering new users
    router.post('/register', async (req, res, next) => {
        try{
            const data = req.body;
            let correctFormat=true;
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
                res.status(200).send(response);
            }else{
                res.status(500).send("Email or password are incorrect");
            }
        }catch(err){
            res.status(500).send("Email or password are incorrect");
        }
    });

    //loging out users
    router.get("/logout", (req, res) => {
        req.logout();
        res.send("logged out");
        //res.redirect('/auth/login');
      });
    router.get('/loggedin', async (req,res)=>{
        if(req.session.passport?.user){
            const user=await userHelperInstance.findUserById(req.session.passport.user);
            res.status(200).send({user, loggedIn: true});
        }else{
            res.status(400).send('Not logged in')
        }
    })
    
}