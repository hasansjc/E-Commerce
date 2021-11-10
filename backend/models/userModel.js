const mongoose =require ('mongoose')
const validator =require ('validator')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength:[30,"name cannot exceed 30 characters"],
        minLength:[3,"name cannot be less than 3 characters"]
    },
    email:{
        type:String,
        required:[true,"please enter  your email"],
        unique:true,
        validate:[validator.isEmail,"please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter the password"],
        maxLength:[10,"name cannot exceed 30 characters"],
        minLength:[3,"name cannot be less than 3 characters"],
        select:false
    },
     avatar:{
         public_id:{
         type:String,
         required:true
         },
         public_url:{
            type:String,
            required:true
            }
     },
    role:{
        type:String,
        default:'user'
    },
   resetPasswordToken:String,
   resetPasswordTExpire:Date
})
userSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,8);          //hashing the password for security
    }
    next();    //  from here returns back to the registration code
})

//Generating auth token
userSchema.methods.generateAuthToken = async function () {
    try{ 
       let token = await jwt.sign({_id:this._id},process.env.SECRET_KEY,{
            expiresIn:process.env.JWT_EXPIRE
       })
       return token;
    }
    catch(err){
        console.log(err)
    }
    
}
module.exports = mongoose.model("USER",userSchema);