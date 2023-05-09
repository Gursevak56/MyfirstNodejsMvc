const mongoose = require('mongoose');
const validator = require('validator');
 //user Schema
 const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter name']
    },
    email:{
        type:String,
        required:[true,'Please enter email'],
        unique:[true,'email already exists'],
        validate:[validator.isEmail,'email is incorrect'],
        lowercase:true
    },
    photo:{
        type:String
    },
    password:{
        type:String,
        required:[true,'password must be required'],
        minlength:8
    },
    confirmpassword:{
        type:String,
        required:true
    }
 })
 //user model
 const User = mongoose.model('User',userSchema);
 module.exports = User;