const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 2000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2');
const MongoStore = require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(sassMiddleware({
  src:'./assets/scss',
  dest:'./assets/css',
  debug:true,
  outputStyle:'expanded',
  prefix:'/css'
}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/upload',express.static(__dirname+'/upload'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
// Advanced usage
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false, // don't create session until something stored
    resave: false,
    store: MongoStore.create({
      mongoUrl: mongodb+srv://koshal:IA58PPRA0ivZf5Br@cluster0.x7vc4e4.mongodb.net/codeial?retryWrites=true&w=majority',
     // mongoOptions: advancedOptions ,// See below for details
      autoRemove: 'disabled'
    })
  }));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//using flash message
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
