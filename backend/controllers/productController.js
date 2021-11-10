const product = require('../models/productModel')



//Creating the product
exports.createProduct = async (req,res,next) =>{
    const product = await product.create(req.body);
    res.status(201).json({
        success:true,
        msg:"product created successfully"})
}

exports.getAllProducts = (req,res) =>{
    res.status(200).send.json({msg:"route is working successfully"})
}