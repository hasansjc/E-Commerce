
const ErrorHandler = require('../utils/errrorhandler');
const asyncErrHandler= require('../middleware/catchAsyncErrors')
const User = require('../models/userModel');
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
    const token = await user.generateAuthToken();
    console.log(token);
    res.status(201).json({
        success:true,
        msg:"user registered successfully",
        user,token
    }) ; 
});