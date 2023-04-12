const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const app=require('./app.js');
console.log(process.env.CONNECT_STR);
const url='mongodb+srv://Gursevak:Gursevak%40123@cluster0.uhsysao.mongodb.net/clineFlex?retryWrites=true&w=majority';
mongoose.connect(url,{
    useNewUrlParser:true
}).then((conn)=>{
    // console.log(conn);
    console.log("DB Connected");
})
 const port=process.env.PORT;
app.listen(port,(err,value)=>{
    if(err)
    {
        console.log(`app is not listen on port ${port}`);
}
else{
    console.log(`app is listen on port ${port}`);
}
})