const mongoose =require ('mongoose')
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the name of the product"]
    },
    description:{
        type:String,
        required:[true,"please enter the product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter the product price"]
    },
     ratings:{
         type:Number,
         default:0
     },
     images:[
         {
         public_id:{
         type:String,
         required:true
         },
         public_url:{
            type:String,
            required:true
            }
     }
    ],
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        maxLength:[5,"cannot exceed 4 charchters"]
    },
    no_of_reviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comments:{
                type:String
            }
        }
    ]
})
module.exports = mongoose.model("PRODUCT",productSchema);