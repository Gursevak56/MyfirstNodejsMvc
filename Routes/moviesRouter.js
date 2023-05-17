const express = require("express");
const usercontroller = require('./../Controller/userController')
const movieRouter = express.Router();
const app = express();
const movieController = require("./../Controller/moviesController");
movieRouter.route('/highestRated').get(movieController.higestRated,movieController.getallmovies);
movieRouter.route("/state/:genres").get(movieController.getState);
movieRouter.route("/").get(usercontroller.userauth, movieController.getallmovies).post(movieController.addNewmovie);
movieRouter.route("/:id").get(movieController.getSinglemovie).delete(usercontroller.userauth,usercontroller.restrict("admin"),movieController.deleteMovie);
movieRouter.route("/:id").patch(movieController.updateMovie);
module.exports = movieRouter;
