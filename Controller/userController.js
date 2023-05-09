const User = require('./../models/userModel.js');
const asyncErrorHandler=require('./../globalError/asyncErrorHandler.js');
exports.signup = asyncErrorHandler(async (req,res,next)=>{
const newuser = await User.create(req.body);
res.status(201).json({
    status:'success',
    data:newuser
})
})
