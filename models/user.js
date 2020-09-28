const { Mongoose } = require("mongoose");

const userSchema=new Mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},

    {
        timeStamps:true
    }
    
); 

const user=Mongoose.model('user',userSchema);