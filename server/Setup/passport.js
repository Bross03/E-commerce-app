const passport=require('passport/lib');
const LocalStrategy=require('passport-local/lib');
const AuthHelper=require('../Helpers/authHelper.js');
const AuthHelperInstance= new AuthHelper();

module.exports=async (app)=>{
    //setup passort
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user,done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        done(null,{id});
    })

    passport.use(new LocalStrategy(
        async (username, password, done)=>{
            try{
            const user= await AuthHelperInstance.login({email:username, password});
            return done(null,user);
            }catch(err){
                return done(err);
            }
        }
    ))
    return passport;
}