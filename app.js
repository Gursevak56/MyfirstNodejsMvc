const express=require('express');
const app=express();
const fs=require('fs');

const movieRouter=require('./Routes/moviesRouter.js');
app.use(express.json());
app.use(express.static('./public'));
app.use('/api/v1/movies',movieRouter);
module.exports=app;