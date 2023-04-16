const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
const Movie=require('./../models/movieModel.js');

exports.getallmovies=async (req,res)=>{
try {
    // console.log(req.query);
    // const allmovie=await Movie.find({duration:145,rating:4.5});
    // const allmovie=await Movie.find(req.query);
    // const allmovie=await Movie.find().where('duration').equals(req.query.duration).where('rating').equals(req.query.rating);
    let queryStr=JSON.stringify(req.query);
    console.log(queryStr);
    queryStr=queryStr.replace(/\b(gte|lte|gt|le)\b/g,(match)=>`$${match}`);
    let queryObj=JSON.parse(queryStr);
    console.log(queryObj);
    const allmovie=await Movie.find(queryObj);
    res.status(200).json({
        status:"success",
        movie:{
            allmovie
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
    try {
        const singleMovie=await Movie.findById(req.params.id);
    res.status(200).json({
        status:"success",
        singleMovie
    })
    } catch (error) {
      res.status.json({
        status:"fail",
        messsage:error.message
      })  
    }
}


exports.addNewmovie=async (req,res)=>{
    try {
        console.log(req.body);
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