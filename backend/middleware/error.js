const ErrorHandler = require('../utils/errrorhandler');
module.exports = (err,req,res,next) =>{
    err.statuscode =err.statuscode || 500;
    err.message = err.message ||"Internal server error";


    //wring mongodb error
    if(err.name==="CastError"){
        const message=`resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message,400);
    }
    res.status(err.statuscode).json({
        success:false,
        error:err.message
    })
}