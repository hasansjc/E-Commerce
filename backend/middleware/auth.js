const ErrorHandler = require("../utils/errrorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.token;
    console.log(token);
    if(!token){
        return next(new ErrorHandler("please login first",401));
    }
    const decodedData =jwt.verify(token,process.env.SECRET_KEY)
    req.user = await User.findById(decodedData.id);
    console.log(req.user);
    next();
})