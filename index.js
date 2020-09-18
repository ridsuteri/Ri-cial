const express=require('express');
const app=express();

const port=8000;

app.listen(port,function(err){
    if(err){
        // interpolation used..
        console.log(`Error running the Server ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});