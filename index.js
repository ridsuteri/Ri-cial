const express=require('express');
const app=express();

const port=8000;

app.set('view engine','ejs');
app.set('view','./views');
// use  express routes
app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err){
        // interpolation used..
        console.log(`Error running the Server ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});