
const ErrorHandler = require('../utils/errrorhandler');
const asyncErrHandler= require('../middleware/catchAsyncErrors')
const User = require('../models/userModel');
const sendToken = require('../utils/jwtTokenGeneration');
//register a user
exports.userReg = asyncErrHandler( async (req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"sample id",
            public_url:"sampke url"
        }
    });
    sendToken(user,201,res);
        
});
// user login
exports.userLogin = asyncErrHandler( async (req,res,next)=>{

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please enter login details",400))
    }

    const user = await User.findOne({ email }).select("password");        // finding the requested userlogin by email
    if (user) {
        const isMatch = await user.comparePassword(password);   // checking whether passwords are matching or not
        if (!isMatch) {
            return next(new ErrorHandler("Invalid Credentials",401))
        }
        else {
                sendToken(user,200,res);
        }
    }
    else {
        return next(new ErrorHandler("User does not exist",400))
    }
})
//logout user
exports.userLogout = asyncErrHandler( async (req,res,next)=>{
    res.cookie('token',null,{
        expires : new Date(Date.now()),
        httpOnly : true
    })
    res.status(200).json({
        success:true,
        message:"logout success"
    })
})