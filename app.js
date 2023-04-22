const express = require("express");
const app = express();
const fs = require("fs");
const errorHandler = require("./coustomHandler/errorHandler");
const movieRouter = require("./Routes/moviesRouter.js");
const globalHandler = require("./globalError/globalHandler");
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/movies", movieRouter);
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //     status:"fail",
  //     message:`can't find url ${req.originalUrl} on the server`
  // })
  // const err=new Error(`cant't find this url ${req.originalUrl} on server`);
  // err.statusCode=600;
  // err.status="fail"
  // next(err);
  const err = new errorHandler("cant't find this url", 404);
  next(err);
  app.use(globalHandler); //errorHandler middleware
});

module.exports = app;
