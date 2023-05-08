const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
function production(error,res){
    res.status(statusCode).json({
        status:error.status,
        message:error.message
    })
}
const development=(error,res)=>{
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message,
        stackjTrace:error.stack,
        error:error
    })
    
}
module.exports=(error,req,res,next)=>{
error.statusCode=error.statusCode || 455;
error.status=error.status || 'fail';

if(process.env.NODE_env === 'development'){
    development(error,res);
}
else if(process.env.NODE_env === 'production'){
   production(error,res);
}
}