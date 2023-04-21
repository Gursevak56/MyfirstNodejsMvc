const mongoose=require('mongoose');
const validator=require('validator');
const fs=require('fs');
const { kMaxLength } = require('buffer');
const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name must be required'],
        unique:true,
        maxlength:[100,"length must be less than hundred"],
        minlength:[2,'length must be greater than two'],
        validate:[validator.isAlpha,'The movie name must contain alphanumric']
    },
    description:{
        type:String,
        required:false
    },
duration:{
    type:Number,
    required:[true,'duration must be add ']
},
rating:{
    type:Number,
    default:1.0,
    min:1
},
totalRating:{
    type:Number,
    validate:function(value){
        return value>1&&value<11
    }
},
releaseYear:{
     type:Number
},
releaseDate:{
type:Date
},
createdAt:{
    type:Date,
    default:Date.now()
},
genres:{
    type:[String],
    required:[true,'genres is required field'],
    enum:{
        values:["Action","Sci-fi","Drama","comedy","crime","emotion"],
        message:'this geners is not speacified for all time'
    }
},
diractors:{
    type:[String],
    //required:[true,'diractors is required']
},
coverImage:{
    type:String,
    //required:[true,'cover image is required field']
},
Actor:{
    type:[String],
    //required:[true,'actor is an required field']
},
Price:{
    type:Number,
    //required:[true,'price is a required field']
},
createdBy:{
type:String
}
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
//virtual method
movieSchema.virtual('durationByHour').get(function(){
    return this.duration/60;
})
//pre method
movieSchema.pre('save',function(next){
    this.createdBy='Gursevak Singh Gill';
    next();
})
//post method
movieSchema.post('save',function(doc,next){
    let content=`The movie ${doc.name}`;
    fs.writeFileSync('./log/log.txt',content,{flag:'a'},(err)=>{
        console.log(err);
    })
    next();
})
movieSchema.pre(/^find/,function(next){
    this.find({rating:{$gte:4}||{$lte:4.2}});
    this.starttime=Date.now();
    next();
})
movieSchema.post(/^find/,function(){
    this.endtime=Date.now();
    let content=`this movie takes ${this.endtime-this.starttime} miliseconds to come`;
    fs.writeFileSync('./log/log.txt',content,{flag:'a'},(err)=>{
        console.log(err);
    })
})
const Movie=mongoose.model('movie',movieSchema);
module.exports=Movie;
