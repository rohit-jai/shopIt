const express = require('express')
const api_router = express.Router()
const orderController = require('../controllers/orderController')
const { isAuthenticatedUser , authorizeRoles } = require('../middelwares/auth')


api_router.post('/new',isAuthenticatedUser,orderController.newOrder)
api_router.get('/me',isAuthenticatedUser,orderController.myOrders)
api_router.get('/allOrderAdmin',isAuthenticatedUser,authorizeRoles('admin'),orderController.getAllOrdersByAdmin)
api_router.put('/updateOrderByAdmin/:id',isAuthenticatedUser,authorizeRoles('admin'),orderController.updateOrderByAdmin)
api_router.delete('/deleteOrderByAdmin/:id',isAuthenticatedUser,authorizeRoles('admin'),orderController.deleteOrderByAdmin)
api_router.get('/:id',isAuthenticatedUser,orderController.getSingleOrder)



module.exports=api_router