const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();

const port=8000;

const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

// extract styles and scripts from sub pages to layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));
app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,function(err){
    if(err){
        // interpolation used..
        console.log(`Error running the Server ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});