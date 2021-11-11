//Creating token  and saving in cookie
const sendToken = async (user,statuscode,res) =>{

    const options={
        httpOnly:true,
        expiresIn:new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000)
    }
    const token = await user.generateAuthToken();
    res.status(statuscode).cookie("token",token,options).json({
    success:true,
    msg:"user registered successfully",
    user,token
})
}
module.exports = sendToken;