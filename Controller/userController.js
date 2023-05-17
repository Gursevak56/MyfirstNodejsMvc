const User = require("./../models/userModel.js");
const asyncErrorHandler = require("./../globalError/asyncErrorHandler.js");
const jwt = require("jsonwebtoken");
const util = require("util");
const customerror = require("./../utils/errorHandler.js");
const singletoken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY, {
    expiresIn: 1000,
  });
};
exports.signup = asyncErrorHandler(async (req, res, next) => {
  const newuser = await User.create(req.body);
  const token = singletoken(newuser._id);
  res.status(201).json({
    status: "success",
    token,
    data: newuser,
  });
});

exports.signin = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  //check email exists or not
  if (!email || !password) {
    const err = new customerror("please provied email and password", 400);
    return next(err);
  }
  //check email and password vaild or not
  const user = await User.findOne({ email: email }).select("+password");
  const isMatch = await user.comparepasswordInDB(password, user.password);
  if (!user || !isMatch) {
    const error = new customerror("user and password incorrect", 400);
    return next(error);
  }
  const token = singletoken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
};
exports.userauth = async (req, res, next) => {
  let testtoken = req.headers.authorization;
  let token;
  if (testtoken && testtoken.startsWith("Bearer")) {
    token = testtoken.split(" ")[1];}
   console.log(token)
  if (!token) {
    return next(new customerror("You are not logged In", 400));
  }
  const decodedtoken = await util.promisify(jwt.verify)(
    token,
    process.env.SECRET_KEY
  );
    const user = await User.findById({_id:decodedtoken._id});
    if(!user){
        const error = new customerror('user not find with the given token',401);
        next(error)
    }
    const ispasswordchanged = await user.passwordchangeInDB(decodedtoken.iat);
    console.log(ispasswordchanged)
    if(ispasswordchanged){
        const error = new customerror('password has been changed after token genrated',401);
        return next(error);
    }
    req.user= user;
  
  next();
};
exports.restrict = (role)=>{
  return (req,res,next)=>{
if(req.user.role !== role){
  const err = new customerror("you have not permission to access this");
  next(err);
}
next();
}
}
