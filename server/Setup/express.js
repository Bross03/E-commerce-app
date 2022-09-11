const cors=require('cors');
const bodyParser=require('body-parser');
const session=require("express-session");
const {SESSION_SECRET}=require('../config.js');
const helmet=require('helmet');
const cookieParser = require('cookie-parser');

module.exports=async (app)=>{

    app.use(cors());
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cookieParser());
    app.use(
        session({
          secret: SESSION_SECRET,
          cookie: { 
            maxAge: 86400000, 
            secure : process.env.NODE_ENV === "production" ? true : false,
            httpOnly:true
          },
          resave: false,
          saveUninitialized: true
        })
    );
  

    return app;
}