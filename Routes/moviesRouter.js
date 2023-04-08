const express=require('express');
const fs=require('fs');
const movieRouter=express.Router();
const app=express();
const movieController=require('./../Controller/moviesController');

movieRouter.route('/').get(movieController.getallmovies).post(movieController.addNewmovie);
movieRouter.route('/:id').get(movieController.getSinglemovie).patch(movieController.updateMovie).delete(movieController.deleteMovie);

module.exports=movieRouter;