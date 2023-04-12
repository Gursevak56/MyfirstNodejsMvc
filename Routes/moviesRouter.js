const express=require('express');
const movieRouter=express.Router();
const app=express();
const movieController=require('./../Controller/moviesController');

movieRouter.route('/').get(movieController.getallmovies).post(movieController.addNewmovie);
movieRouter.route('/:id').get(movieController.getSinglemovie).delete(movieController.deleteMovie);
movieRouter.route('/:id').patch(movieController.updateMovie)
module.exports=movieRouter;