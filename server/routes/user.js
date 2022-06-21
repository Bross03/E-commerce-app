const express=require('express');
const router=express.Router();
const userHelper=require('../Helpers/userHelper')

const userHelperInstance= new userHelper();

module.exports=(app)=>{

    //setting up router
    app.use('/api/users', router)
    
    //get all users
    router.get('/',async (req,res,next)=>{
        const users= await userHelperInstance.getAllUsers()
        res.send(users);
    });

    router.get('/mine',async (req,res,next)=>{
        if(req.session.passport?.user){
            const user=await userHelperInstance.findUserById(req.session.passport.user);
            if(user){
            res.send(user);
            }else{
                res.status(500).send();
            }
        }else{
            res.status(500).send("You must be logged in to access this path");
        }
    });

    //get user by id
    router.get('/:id',async (req,res,next)=>{
        const user=await userHelperInstance.findUserById(req.params.id);
        if(user){
        res.send(user);
        }else{
            res.status(500).send("User not found");
        }
    });

    
    router.put('/mine', async (req,res,next)=>{
        if(req.session.passport?.user){
            try{
                let correctFormat=true;
                for(const i in req.body){
                    if(i!="first_name" && i!="last_name" && i!="password" && i!="email"){
                        correctFormat=false;
                    }
                }
                if(req.body.id){
                    correctFormat=false;
                }
                if(correctFormat){
                    const updatedUser=await userHelperInstance.updateUser(req.session.passport.user, req.body);
                    res.status(200).send(updatedUser);
                }else{
                    res.status(404).send("Bad request");
                }
            }catch(err){
                res.status(500).send(err)
            }
        }else{
            res.status(500).send('You must be logged in to the user you are trying to update')
        }
    });

    //update product
    router.put('/:id',async (req,res,next)=>{
        if(req.params.id==req.session.passport?.user){
            try{
                let correctFormat=true;
                for(const i in req.body){
                    if(i!="first_name" && i!="last_name" && i!="password" && i!="email"){
                        correctFormat=false;
                    }
                }
                if(req.body.id){
                    correctFormat=false;
                }
                if(correctFormat){
                    const updatedUser=await userHelperInstance.updateUser(req.params.id, req.body);
                    res.status(200).send(updatedUser);
                }else{
                    res.status(404).send("Bad request");
                }
            }catch(err){
                res.status(500).send(err)
            }
        }else{
            res.status(500).send('You must be logged in to the user you are trying to update')
        }
    });

}