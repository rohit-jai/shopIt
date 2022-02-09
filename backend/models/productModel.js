const {model, Schema } = require('mongoose')
// const mongoose = require('mongoose')

const productShcema = new Schema({
        name:{
            type:String,
            required: [true, 'Please Enter Product Name'],
            trim: true,
            maxlength: [100, 'Product name can not exceed 100 character']
        },
        price:{
            type: Number,
            required: [true, "Please Enter Product Price"],
            maxlength: [5,'Product Price can to exceed 5 character '],
            default: 0.0
        },
        description:{
            type:String,
            required: [true, 'Please Enter Product Name']           
        },
        ratings: {
            type: Number,
            default: 0
        },
        images: [
            {
                public_id:{
                    type:String,
                    required:true
                },
                url: {
                    type:String,
                    required: true
                }
            }
        ],
        category:{
            type:String,
            required: [true, 'Please select category for this product'],
            enum: {
                values:[
                    'Electronics',
                    'Cameras',
                    'Laptops',
                    'Accessories',
                    'Headphones',
                    'Food',
                    "Books",
                    "Clothes/shoes",
                    'Beauty/Health',
                    'Sports',
                    'Outdoor',
                    'Home'
                ],
                message: 'Please Select correct category for product'
            }
        },
        seller: {
            type: String,
            required: [true, 'please enter product saller ']
        },
        stock:{
            type:Number,
            required: [true, 'please enter product stock'],
            maxlength: [5, 'Product Stock is not more then 5 characters'],
            default: 0
        },
        numOfReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                user: {
                    type: Schema.ObjectId,
                    ref:'User',
                    required:true
                },
                name:{
                    type:String,
                    required: true
                },
                rating:{
                    type:Number,
                    required:true
                },
                comment: {
                    type:String,
                    required: true
                }
            }
        ],
        user: {
            type: Schema.ObjectId,
            ref:'User',
            required:true
        },
        createdAt: {
            type:Date,
            default: Date.now
        }
})

module.exports = model('Product',productShcema)