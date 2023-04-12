const mongoose=require('mongoose');
const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name must be required'],
        unique:true
    },
    description:{
        type:String,
        required:true
    },
duration:{
    type:Number,
    required:[true,'duration must be add ']
},
rating:{
    type:Number,
    default:1.0
}
})

const Movie=mongoose.model('movie',movieSchema);
module.exports=Movie;
