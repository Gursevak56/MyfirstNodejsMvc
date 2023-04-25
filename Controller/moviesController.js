const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
const Movie=require('./../models/movieModel.js');
const appFeatures=require('../coustomHandler/appFeatures.js');
exports.highestMovie=(req,res,next)=>{
    req.query.limit='1';
    req.query.sort='-rating';
    next();
}
exports.getallmovies=async (req,res)=>{
try {
    // console.log(req.query);
    // const allmovie=await Movie.find({duration:145,rating:4.5});
    // const allmovie=await Movie.find(req.query);
    // const allmovie=await Movie.find().where('duration').equals(req.query.duration).where('rating').equals(req.query.rating);
    // let queryStr=JSON.stringify(req.query);
    // console.log(queryStr);
    // queryStr=queryStr.replace(/\b(gte|lte|gt|le)\b/g,(match)=>`$${match}`);
    // let queryObj=JSON.parse(queryStr);
    // console.log(queryObj);
    // const allmovie=await Movie.find({duration:{$lte:140}});
    console.log(req.query)
    const features=new appFeatures(Movie.find(),req.query).filter().sort().limiting().paginate();
  const movies=await features.query;
   // console.log(movies);
    // if(req.query.sort){
    //     const sortBy=req.query.sort.split(',').join(' ');
    //     query=query.sort(sortBy);
    //     query=query.select('name,duration');
    // }
    // else{
    //     query=query.sort('-createdAt');
    // }
//    if(req.query.fields){
//     console.log(req.query.fields);
//     const fields=req.query.fields.split(',').join(' ');
//     console.log(fields);
//     query=query.select(fields);
//    }
    // const page=req.query.page*1||1;
    // const limit=req.query.limit*1||7;
    // console.log(page);
    // let skip=(page-1)*limit;
    // console.log(skip);
    // query=query.skip(skip).limit(limit);
    // const movies=await query;
    res.status(200).json({
        status:"success",
        movie:{
            movies
        }
    })
} catch (error) {
    res.status(404).json({
    status:"fail",
    messsage:error.message
})
    }
}
exports.getSinglemovie=async (req,res,next)=>{
        const singleMovie=await Movie.findById(req.params.id);
        if(!singleMovie){
            const err=new coustomError('this movie is not found',404);
            console.log(err);
            return next(err);
        }
    res.status(200).json({
        status:"success",
        singleMovie
    })
    }   



exports.addNewmovie=async (req,res)=>{
    try {
        // console.log(req.body);
        const movie= await Movie.create(req.body);
        res.status(201).json({
            status:"success",
            movie:{
                movie
            }
        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.updateMovie=async (req,res)=>{
   try {
    const updatedMovie=await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({
        status:"success",
        updatedMovie:{
            updatedMovie
        }
    })
   } catch (error) {
    res.status(404).json({
        status:"fail",
        message:error.message
    })
   }    
}

exports.deleteMovie= async (req,res)=>{

    try {
        const deleteMovie=await Movie.findByIdAndDelete(req.params.id);
    } catch (error) {
        res.status(400).send(error.message);
    }
    }
   exports.getState=async(req,res)=>{
    try {
        const genres=req.params.genres;
        const movies=await Movie.aggregate([
            
            {$unwind:'$genres'},
            {$group:{
                _id:'$genres',
                movieCount:{$sum:1},
                movies:{$push:'$name'}
            }},
            {$addFields:{genres:"$_id"}},
            {$project:{_id:0}},
            {$sort:{movieCount:-1}},
            {$match:{genres:genres}}
            
        ])
        res.status(200).json({
            status:"success",
            count:movies.length,
            Movies:movies

        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:error.message,
        })
    }
   }
   exports.suchAllmovies=async(req,res)=>
   {
    try {
        const movies=await Movie.find();
        res.status(200).json({
            status:"success",
            count:Movie.length,
            movies:movies
        })
    } catch (error) {
        res.status(400).json({
            status:"success",
            message:error.message
        })
    }
   }