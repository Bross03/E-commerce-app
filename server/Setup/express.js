const cors=require('cors');
const bodyParser=require('body-parser');
const session=require("express-session");
const {SESSION_SECRET}=require('../config.js');
const helmet=require('helmet');

module.exports=async (app)=>{

    app.use(cors());
    app.use(bodyParser.json());
    app.use(helmet());

    app.use(
        session({
          secret: SESSION_SECRET,
          cookie: { 
            maxAge: 86400000, 
            secure: false,
            httpOnly:true
          },
          resave: false,
          saveUninitialized: false
        })
    );

    return app;
}