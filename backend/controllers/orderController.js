const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')

exports.newOrder = async(req,res)=>{
    try{
        console.log("user id is we can get this after using middelware isAuthenticatedUser  : ", req.user._id);
        const {
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo
        } = req.body
    
            const order = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user : req.user._id
            })
               
            res.status(200).json({
                success:true,
                message:"New order created",
                order
            })

    }
    catch(error){
        res.status(500).send('Error is ' + error)
    }
}

// get Single Order 

exports.getSingleOrder = async(req,res,next) =>{
    try{
        const order = await Order.findById(req.params.id).populate('user', 'name email')
        if(!order)
        {
            return next(new ErrorHandler('No order found with this id', 404))
        }
        else
        {
            res.status(200).json({
                success:true,
                order
            })
        }
    }
    catch(error)
    {
        res.status(500).send("Error is :" + error)
    }    
}

//get logeed in user order 

exports.myOrders = async(req , res) =>{    
    try{
        const order = await Order.find({user:req.user.id})
             
            res.status(200).json({
                success:true,
                order
            })        
    }
    catch(error)
    {
  
        res.status(500).send("Error is :" + error)
    }    
}

// get all orders by admin 
exports.getAllOrdersByAdmin = async(req , res , next) =>{    
    try{        
        const order = await Order.find()
             
        if(!order)
        {
            return next(new ErrorHandler('No order found', 404)) 
        }
        else
        {
            let totalPrice = 0
            order.forEach(orders => {
                totalPrice += orders.totalPrice
            })
            res.status(200).json({
                success:true,
                count: order.length,
                totalPrice,
                order
            })   
        }
                 
    }
    catch(error)
    {
        
        res.status(500).send("Error is :" + error)
    }    
}

//update the order change order status process order - admin 
 exports.updateOrderByAdmin = async(req,res,next) =>{
     try{
         const order = await Order.findById(req.params.id)
         if(!order)
         {
            return next(new ErrorHandler(`No order found with this order Id ${req.params.id}`, 404)) 
         }
            else
            {
                if(order.orderStatus === 'Delivered')
                {
                    return next(new ErrorHandler(`You have already delivered this order ${req.params.id}`, 400)) 
                }
                else
                {
                    order.orderItems.forEach(async item =>{
                        await updateStock(item.product, item.quantity)
                    })
                        order.orderStatus = req.body.status
                        order.deliveredAt = Date.now()
                        await order.save()
                    res.status(200).json({
                        success:true
                    })
                }
            }
     }
     catch(error)
     {
        res.status(500).send("Error is :" + error)
     }
 }
 async function updateStock(id,quantity){
     const product = await Product.findById(id)
     product.stock = product.stock - quantity,
     
     await product.save({ validateBeforeSave : false})
 } 

 // Now we are working on the delete order by id by admin

 exports.deleteOrderByAdmin = async(req,res, next)=>{
     try{
         const order = await Order.findByIdAndDelete(req.params.id)
          if(!order){
            return next(new ErrorHandler(`Order is not persent by this Id ${req.params.id}`, 404))
          }
          else
          {          
            res.status(200).json({
                success:true,
                message:'Order is deleted '
            })
          }
     }
     catch(error)
     {
        res.status(500).send("Error is :" + error)
     }
 }

 