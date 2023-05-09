const express = require("express");
const app = express();
const fs = require("fs");
const movieRouter = require("./Routes/moviesRouter.js");
const usersrouter = require('./Routes/usersrouter.js');
const errorHandler = require("./utils/errorHandler.js");
const globalHandler = require("./globalError/globalHandler.js");
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyparser.json());
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/movies", movieRouter);
app.use('/api/v1/user', usersrouter);
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //     status:"fail",
  //     message:`can't find url ${req.originalUrl} on the server`
  // })
  // const err=new Error(`cant't find this url ${req.originalUrl} on server`,404);
  // err.statusCode=600;
  // err.status="fail"
  // next(err);

  // app.use((err,req,res,next)=>{
  //   err.statusCode=err.statusCode || 500;
  //   err.status=err.status || 'fail';
  //   res.status(err.statusCode).json({
  //     status:err.status,
  //     message:err.message
  //   })
  // })
  const err = new errorHandler(`cant't find this url ${req.originalUrl}`, 415);
  next(err);
  app.use(globalHandler); //errorHandler middleware
});

module.exports = app;
