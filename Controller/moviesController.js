const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Movie = require("./../models/movieModel.js");
const appFeatures = require("../coustomHandler/appFeatures.js");
// const asyncErrorHandler=require('./../globalError/asyncErrorHandler.js');
const coustomError = require("./../coustomHandler/errorHandler.js");
exports.higestRated = async (req,res,next)=>{
  req.query.limit = '5';
  req.query.sort = '-rating'
  next();
}
exports.getallmovies = async (req, res) => {
  let querystr = JSON.stringify(req.query);
  querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`);
 const queryObj = JSON.parse(querystr);
  console.log(queryObj)


  // const movies = await Movie.find().where('duration').equals(req.query.duration);
  //sorting method
  let query =  Movie.find();
  if(req.query.sort){
    const sortby = req.query.sort.split(',').join(' ');
    query =query.sort(sortby);
  }
  //limiting method
  if(req.query.fields){
    const sortby = req.query.fields.split(',').join(' ');
    query = query.select(sortby);
  }
  //pagination method
  
    const page = req.query.page*1||1;
    const limit =req.query.limit*1||10;
    const skip =(page-1)*limit;
    query = query.skip(skip).limit(limit);

   const movies = await query;
  if(!movies){
    res.status(404).json({
      status:'fail',
      movies
    })
  }
  res.status(200).json({
    status:'Success',
    moviecount:movies.length,
    movies
  })
}
const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    console.log("this is only asyncfunction");
    func(req, res, next).catch((err) => {
      console.log("now i am in the errr message");
      next(err);
    });
  };
};

exports.getSinglemovie = asyncErrorHandler(async (req, res, next) => {
  const singleMovie = await Movie.findById(req.params.id);
  if (!singleMovie) {
    const err = new coustomError("this movie is not found", 404);
    console.log(err);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    singleMovie,
  });
});

exports.addNewmovie = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(201).json({
    status: "success",
    movie: {
      movie,
    },
  });
};

exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      updatedMovie: {
        updatedMovie,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.getState = async (req, res) => {
  try {
    const genres = req.params.genres;
    const movies = await Movie.aggregate([
      { $unwind: "$genres" },
      {
        $group: {
          _id: "$genres",
          movieCount: { $sum: 1 },
          movies: { $push: "$name" },
        },
      },
      { $addFields: { genres: "$_id" } },
      { $project: { _id: 0 } },
      { $sort: { movieCount: -1 } },
      { $match: { genres: genres } },
    ]);
    res.status(200).json({
      status: "success",
      count: movies.length,
      Movies: movies,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
