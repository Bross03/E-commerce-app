const passport=require('passport');
const LocalStrategy=require('passport-local');
const AuthHelper=require('../Helpers/authHelper.js');
const { FACEBOOK } = require('../config.js');
const AuthHelperInstance= new AuthHelper();
const FacebookStrategy = require('passport-facebook').Strategy;

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
    ));

    passport.use(new FacebookStrategy({
        clientID: FACEBOOK.CONSUMER_KEY,
        clientSecret: FACEBOOK.CONSUMER_SECRET,
        callbackURL:FACEBOOK.CALLBACK_URL,
        profileFields: ["email", "name"]
    },
    async(accessToken, refreshToken, profile, done)=>{
        try{
            console.log('is this thing even running?');
            console.log('profile below')
            console.log(profile);
            const { email, first_name, last_name, id } = profile._json;
            const userData = {
                email,
                firstName: first_name,
                lastName: last_name,
                facebookID: id
            };
            console.log(userData);
            const user=await AuthHelperInstance.loginWithFacebook(userData);
            return done(null, user);
        }catch(err){
            return done(err);
        }
    }))
    return passport;
}