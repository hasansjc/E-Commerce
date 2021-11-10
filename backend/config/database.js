const mongoose = require ('mongoose')
const connectDatabase = () =>{
    mongoose.connect(process.env.DB)
.then((data)=>{
    console.log(`connection successfull with server ${data.connection.host}`);
}).catch((err)=>{
    console.log("failed to connect");
})
}
module.exports =connectDatabase;