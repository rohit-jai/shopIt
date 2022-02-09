const productModel = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')


exports.getproducts = (req,res)=>{
    res.status(200).json({
        success:true,
        message:'this routes show all the product in database '
    })
}

exports.newProduct = async(req,res) =>{
        req.body.user = req.user.id
    const product = await productModel.create(req.body)

    res.status(200).json({
        success:true,
        product
    })
}

exports.displayAll = async(req,res)=>{
    try{
        await productModel.find()
        .then(async (products)=>{
            const productsCount = await productModel.countDocuments()
            setTimeout(()=>{
                res.status(200).json({
                    success:true,
                    productsCount,
                    products
                })
            }, 500)           
        })
        .catch((error)=>{
            res.status(404).send("Data No found ")
        })

    }
    catch(error){
        res.status(404).send("Error is :" , error)
    }
}

exports.getSingleProduct = async(req,res , next) =>{
    const product = await productModel.findById(req.params.id)
    if(!product)
    {
        return next(new ErrorHandler('Product not Found', 404))
    }
    setTimeout(()=>{
        res.status(200).json({
            success:true,
            product
        })
    },500)
    
}

exports.updateProduct = async(req,res) =>{
    try{
        await productModel.findByIdAndUpdate(req.params.id,req.body)
        .then((result)=>{
            res.status(200).json({
                success:true,
                count: result.length,
                result
            })
        })
        .catch((error)=>{
            res.status(404).send("Not able to update this product")
        })

    }
    catch(error){
        res.status(404).send("Error is :" , error)
    }
}

exports.deleteProduct = async(req,res) =>{
    try{
        await productModel.deleteMany()
        .then((result)=>{
            res.status(200).json({
                success:true,
                count: result.length,
                result
            })
        })
        .catch((error)=>{
            res.status(404).send("Not Able to delete")
        })

    }
    catch(error){
        res.status(404).send("Error is :" , error)
    }
}

exports.deleteProductByID = async(req,res) =>{
  
        const product = await productModel.findById(req.params.id)
        if(!product)
        {
            return res.status(404).json({
                success: false,
                message:'Product Not found'
            })
        }

        await productModel.deleteOne()
        res.status(200).json({
            success:true,
            message:"Product is deleted "
        })        
}

//create a new review for the product

exports.createProductReview = async(req,res) =>{
    try{
            const { rating , comment , productId }  = req.body

            const review = {
                user: req.user._id,
                name: req.user.name,
                rating: Number(rating),
                comment
            }

            const product = await productModel.findById(productId)
                const isReviewed = product.reviews.find(
                    r => r.user.toString() === req.user._id.toString()
                )

                if(isReviewed){
                    product.reviews.forEach(review =>{
                        if(review.user.toString() === req.user._id.toString()){
                            review.comment = comment,
                            review.rating = rating
                        }
                    })

                }
                else{
                    product.reviews.push(review)
                    product.numOfReviews = product.reviews.length
                }
            product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

                    await product.save({ validateBeforeSave : false})
                    res.status(200).json({
                        success:true
                    })

    }
    catch(error){
        res.status(404).send("Error is :" , error)
    }
}

// get all product review 

exports.getProductReviews = async(req,res)=>{
     const product = await productModel.findById(req.query.id)

     res.status(200).json({
         success:true,
         reviews: product.reviews
     })
}


//Delete the review of the product
exports.deleteProductReviews = async(req,res)=>{
    const product = await productModel.findById(req.query.productId)
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
    const numOfReviews = reviews.length
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
    await productModel.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new : true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success:true,
        
    })
}
