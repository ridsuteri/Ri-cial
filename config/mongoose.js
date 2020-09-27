const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/ri-cial_dev');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error connecting to DB'));
db.once('open',function(){
    console.log('Connected to DB: MongoDB');
});

module.exports=db;