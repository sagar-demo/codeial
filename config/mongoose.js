const mongoose = require('mongoose');

// mongoose.connect('mongodb://0.0.0.0:27017/codeial_development');

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });
// *******Mongodb atlas************

const db="mongodb+srv://koshal:IA58PPRA0ivZf5Br@cluster0.x7vc4e4.mongodb.net/codeial?retryWrites=true&w=majority";

const connectionparams={
    useNewUrlParser:true,
    useUnifiedTopology:true
};
mongoose.connect(db,connectionparams).then(()=>{console.log('connected to  the database');})
.catch((e)=>{
    console.log('Error:',e);
});
module.exports=db;
