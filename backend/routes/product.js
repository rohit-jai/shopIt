const express = require('express')
const api_router = express.Router()

const productcontroller = require('../controllers/productController')
const { isAuthenticatedUser , authorizeRoles } = require('../middelwares/auth')


api_router.get('/',productcontroller.getproducts)
api_router.post('/admin/new',isAuthenticatedUser,productcontroller.newProduct)
api_router.get('/show',productcontroller.displayAll)
api_router.put('/review',isAuthenticatedUser,productcontroller.createProductReview)
api_router.get('/reviews',isAuthenticatedUser,productcontroller.getProductReviews)
api_router.delete('/deletereviews',isAuthenticatedUser,productcontroller.deleteProductReviews)
api_router.get('/showSingleProduct/:id',productcontroller.getSingleProduct)
api_router.patch('/admin/updateSingleProduct/:id',isAuthenticatedUser,authorizeRoles('admin'),productcontroller.updateProduct)
api_router.delete('/admin/deleteAllProduct',isAuthenticatedUser,authorizeRoles('admin'),productcontroller.deleteProduct)
api_router.delete('/admin/deleteProductById/:id',isAuthenticatedUser,authorizeRoles('admin'),productcontroller.deleteProductByID)



module.exports=api_router