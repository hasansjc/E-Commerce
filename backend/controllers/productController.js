const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errrorhandler');
const asyncErrHandler= require('../middleware/catchAsyncErrors')
const ApiFeatures =require('../utils/apifeatures')


//Creating the product ---Only for Admin
exports.createProduct = asyncErrHandler(async (req,res,next) =>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        msg:"product created successfully",
        product
    })  
})
// Get All Products
exports.getAllProducts = asyncErrHandler(async (req,res) =>{
    const resPerPage  = 5;
    const productCount = await Product.countDocuments();

    const apifeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resPerPage);
    const products = await apifeature.query;
    res.status(200).json({
        success:true,
        products,
        productCount
    })
})

//Update product details
exports.updateProduct = asyncErrHandler(async (req,res,next) =>{
    let product =await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            msg:"Product not found"
        })
    }
    else{
        product= await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success:true,
            product
        })
    }
})
// delete product --Admin
exports.deleteProduct = asyncErrHandler(async (req,res,next) =>{
    let product =await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            msg:"Product not found"
        })
    }
    else{
        await product.remove();
        res.status(200).json({
            success:true,
            msg:"Product deleted successfuly"
        })
    }

})
// Get One Product
exports.getOneProduct = asyncErrHandler(async (req,res,next) =>{
    let product =await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            msg:"Product not found"
        })
    }
    else{
        res.status(200).json({
            success:true,
            product
        })
    }
})
