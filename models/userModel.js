const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
    role:
    {
        type:String,
        enum:['user','admin'],
        default:"user"
    },
    password:{
        type:String,
        required:[true,'password must be required'],
        minlength:8,
        select:false
    },
    confirmpassword:{
        type:String,
        required:true,
        validate:{
            validator:function(val){
                return val === this.password;
            }
        }
    },
    passwordAt:{type:Date,default:Date.now()}
 })
 userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.confirmpassword=undefined;
    return next();

 })
 userSchema.methods.comparepasswordInDB = async function(pswd,pswddb){
    return await bcrypt.compare(pswd,pswddb);
 }
 userSchema.methods.passwordchangeInDB = async function(JWTTimstamp){
    if(this.passwordAt){
        console.log(parseInt(this.passwordAt.getTime()/1000),JWTTimstamp);
    }
    return JWTTimstamp < parseInt(this.passwordAt.getTime()/1000);
 }
 //user model
 const User = mongoose.model('User',userSchema);
 module.exports = User; 