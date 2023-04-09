const express=require('express');
const app=express();
const fs=require('fs');
app.use(express.json());
let movies=JSON.parse(fs.readFileSync('./data/movies.json','utf-8'));

exports.getallmovies=
(req,res)=>{
    res.status(200).json({
        status:"success",
        data:{
            movies:movies
        }
    });
    }
    exports.getSinglemovie=(req,res,next)=>{

    const movie=movies.find(f=>f.id===req.params.id);
    if(!movie){
        res.status(400).json({
            "status":"fail",
            'movie':`movie not found with id ${req.params.id}`
        })
        next();
    }
    res.json({
        data:{
            movie:movie
        }
    })
}

exports.validate=(req,res,next)=>{
    if(!req.body.name || !req.body.realeasedate){
        res.status(400).json({
            'status':'fail',
            'data':'data not found from client'
        })
    }
    next();
}

exports.addNewmovie=(req,res)=>{
    // console.log(req.body);
    // res.status(200).json({
    //     status:"success",
    //     data:{
    //         movies:req.body
    //     }
    // });
    const newId=Number(movies[movies.length-1].id)+1;
    const newMovie=Object.assign( {id:newId},req.body);
    movies.push(newMovie);
    fs.writeFile('./data/movies.json',JSON.stringify(movies),()=>{
        console.log("written");
    });
    res.status(200).json({
        data:{
            movie:newMovie
        }
    })
}

exports.updateMovie=(req,res)=>{
    let id=req.params.id;
    let newUpdateMovie = movies.find((f)=>{
        if(f.id === id)
        {
            return f;
        }
        else{
            return false;
        }
    })
    let onj=Object.assign(newUpdateMovie,req.body);
    res.status(200).json({
    
    onj
    
    })
}

exports.deleteMovie=(req,res)=>{
    let moivess=fs.readFileSync('./data/movies.json','utf-8');
        let id=req.params.id;
        let movieToDelete=movies.find(f =>f.id===id);
        let index=movies.indexOf(movieToDelete);
        console.log(index);
        let arr=[1,2,3,4,5];
        movies.splice(0,4);
        res.status(207).json({
            status:'success',
            deletedmovie:movieToDelete
        })
    }