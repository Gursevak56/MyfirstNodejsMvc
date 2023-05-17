const dotenv=require('dotenv');
module.exports=(error,req,res,next)=>{
error.statusCode=error.statusCode || 455;
error.status=error.status || 'fail';

res.status(error.statusCode).json({
    status:error.statusCode,
    message:error.message,
    stackTrace:error.stack,
    error:error
})
next();
}