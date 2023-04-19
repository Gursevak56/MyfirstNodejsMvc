const mongoose=require('mongoose');
const fs=require('fs');
const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name must be required'],
        unique:true
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
    default:1.0
},
totalRating:{
    type:Number
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
    //required:[true,'genres is required field']
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
const Movie=mongoose.model('movie',movieSchema);
module.exports=Movie;
