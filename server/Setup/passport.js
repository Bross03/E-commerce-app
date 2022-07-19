const passport=require('passport');
const LocalStrategy=require('passport-local');
const AuthHelper=require('../Helpers/authHelper.js');
const { FACEBOOK, GOOGLE, GITHUB } = require('../config.js');
const AuthHelperInstance= new AuthHelper();
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy=require('passport-google-oauth20').Strategy;

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
            const { email, first_name, last_name, id } = profile._json;
            const userData = {
                email,
                firstName: first_name,
                lastName: last_name,
                facebookID: id
            };
            const user=await AuthHelperInstance.loginWithFacebook(userData);
            return done(null, user);
        }catch(err){
            return done(err);
        }
    }));

    passport.use(new GoogleStrategy({
        clientID: GOOGLE.CONSUMER_KEY,
        clientSecret: GOOGLE.CONSUMER_SECRET,
        callbackURL:GOOGLE.CALLBACK_URL,
        profileFields: ["email", "name"]
    },
    async(accessToken, refreshToken, profile, done)=>{
        try{
            const { email, given_name, family_name } = profile._json;
            const {id}=profile;
            const userData = {
                email,
                firstName: given_name,
                lastName: family_name,
                googleID: id
            };

            const user=await AuthHelperInstance.loginWithGoogle(userData);
            return done(null, user);
        }catch(err){
            return done(err);
        }
    }));



    return passport;
}