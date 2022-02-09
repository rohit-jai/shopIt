const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    shippingInfo:{
            address:{
                type:String,
                required:[true, 'Please Enter Address']
            },
            city:{
                type:String,
                required:[true, 'Please Enter City']
            },
            phoneNo:{
                type:String,
                required:[true, 'Please Enter Phone Number']
            },
            postalCode:{
                type:String,
                required:[true, 'Please Enter Postal code']
            },
            country:{
                type:String,
                required:[true, 'Please Enter Country Name']
            }
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        orderItems:[
            {
                name:{
                    type:String,
                    required:[true, 'Please Enter name of the order']
                },
                quantity:{
                    type:Number,
                    required:[true, 'Please Enter Quantity']
                },
                image:{
                    type:String,
                    required:[true, 'Please Enter image of the product']
                },
                price:{
                    type:Number,
                    required:[true, 'Please Enter price of the order']
                },
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    required:true,
                    ref:'Product'
                },

            }
        ],
        paymentInfo:{
            id:{
                type:String
            },
            status : {
                type:String
            }
        },
        paidAt: {
                type:Date
        },
        itemsPrice : {
            type: Number,
            required:[true , 'Please Enter Item Price'],
            default: 0.0
        },
        taxPrice : {
            type: Number,
            required:[true , 'Please Enter Tax Price'],
            default: 0.0
        },
        shippingPrice : {
            type: Number,
            required:[true , 'Please Enter shipping Price'],
            default: 0.0
        },
        totalPrice : {
            type: Number,
            required:[true , 'Please Enter total Price'],
            default: 0.0
        },
        orderStatus : {
            type:String,
            required:[true , 'Please Enter order status'],
            default: 'Processing'
        },
        delieverdAt: {
            type: Date
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
})

module.exports = mongoose.model('Order', orderSchema)