const mongoose=require('mongoose');
const dotenv=require('dotenv');
const fs=require('fs');
const Movie=require('./../models/movieModel.js');
dotenv.config({path:'./config.env'});
console.log(process.env.DB_CONN_STRING.hostname);
//connect to database
const url='mongodb+srv://Gursevak:Gursevak%40123@cluster0.uhsysao.mongodb.net/clineFlex?retryWrites=true&w=majority';
mongoose.connect(process.env.DB_CONN_STRING,{
    useNewUrlParser:true
}).then((conn)=>{
    // console.log(conn);
    console.log("DB Connected");
})
const movies=JSON.parse(fs.readFileSync('./data/movies.json'));

const importmovie=async (req,res)=>{
    try {
        Movie.create(movies);
        console.log('data inserted successufully');
    } catch (error) {
        console.log(error.message);
    }
}
importmovie();
