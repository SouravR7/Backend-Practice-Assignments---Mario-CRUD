const mongoose = require('mongoose');

//  Your code goes here

const marioSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
        required: true
    }
})

const mariochar = mongoose.model("marioModel", marioSchema);


module.exports = mariochar;
