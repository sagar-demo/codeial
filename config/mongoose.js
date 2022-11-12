const mongoose = require('mongoose');
const db='mongodb+srv://sagar:Sagar%4012@cluster0.c1afmxi.mongodb.net/codeial_development?retryWrites=true&w=majority';

const connectionparams={
    useNewUrlParser:true,
    useUnifiedTopology:true
};
mongoose.connect(db,connectionparams).then(()=>{console.log('connected to  the database');})
.catch((e)=>{
    console.log('Error:',e);
});
// mongoose.connect(db,{
//     useNewUrlParser:true,
//     //useCreateIndex:true,
//     useUnifiedTopology:true,
//     //useFindAndModify:false
// }).then(()=>{
//     console.log(`Connection successful`);
// }).catch((err)=>console.log(`no connection`));


// // DB.once('open', function(){
// //     console.log('Connected to Database :: MongoDB');
// // });


module.exports = db;
