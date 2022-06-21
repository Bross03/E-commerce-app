const userHelper=require('./userHelper.js');
const userHelperInstance= new userHelper();

const util=require('../util/util.js')
const utilInstance= new util();

module.exports= class AuthHelpers{

    //register users
    async register(data){
        try{
            const {email}=data;
            const user=await userHelperInstance.findUserByEmail(email);
            if(user){
               return null;
            }
            data.password=await utilInstance.passwordHash(data.password);
            await userHelperInstance.createUser(data);
            const newUser=await userHelperInstance.findUserByEmail(email);
            return newUser;
        }catch(err){
            return err;
        }
    };

    //login users
    async login(data){

        const {email,password}=data;

        try{
            const user=await userHelperInstance.findUserByEmail(email);
            
            if(!user){
                return false;
            }
            if(!await utilInstance.comparePasswords(password, user.password)){
                return false;
            }
            return user;
        }catch(err){
            return err;
        }
    };

 
}