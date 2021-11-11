
const express = require ('express')
const app =express();
const errorMiddleware = require ("./middleware/error"); 
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser());

//Route imports
const products = require('./routes/productRoute')
const user =require('./routes/userRoutes')

app.use("/api/v1",products)
app.use("/api/v1",user);

app.use(errorMiddleware)

module.exports = app