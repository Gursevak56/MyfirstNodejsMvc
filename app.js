const express=require('express');
const fs=require('fs');
const app=express();
const movieRouter=require('./Routes/moviesRouter.js');
app.use(express.json());
app.use('/api/v1/movies',movieRouter);
module.exports=app;