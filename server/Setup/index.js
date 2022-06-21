const expressSetup=require('./express.js');
const passportSetup=require('./passport.js');
const routes=require('../routes');

module.exports= async (app)=>{
    const expressApp=await expressSetup(app);
    const passport= await passportSetup(expressApp);

    routes(expressApp,passport);
}