const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID:"971424011214-78p97kk3pqrm1gqm9uktgu9lds2ct8cn.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
},
function(accessToken,refreshToken,profile,done){
    //find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('Error in google strategy passport',err);return;}
        console.log(accessToken,refreshToken);
        console.log(profile);

        if(user){
            //if found ,set user as req.user
            return done(null,user);
        }else{
            //if not found ,create the user and set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log('Error in creating user google strategy-passport',err);return;}
                return done(null,user);
            })
        }
    })
}
));

module.exports=passport