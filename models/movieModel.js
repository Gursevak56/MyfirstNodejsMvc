const mongoose=require('mongoose');
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
}
})

const Movie=mongoose.model('movie',movieSchema);
module.exports=Movie;
