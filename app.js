const express=require('express');
const app=express();
const fs=require('fs');

const movieRouter=require('./Routes/moviesRouter.js');
app.use(express.json());
app.use(express.static('./public'));
app.use('/api/v1/movies',movieRouter);
app.all('*',(req,res,next)=>{
    res.status(404).json({
        status:"fail",
        message:`can't find url ${req.originalUrl} on the server`
    })
})
module.exports=app;