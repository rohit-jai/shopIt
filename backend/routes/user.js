const express = require('express')
const api_router = express.Router()
const { isAuthenticatedUser , authorizeRoles } = require('../middelwares/auth')

const userController = require('../controllers/authController')

api_router.post('/register',userController.registerUser)
api_router.post('/loginUser',userController.loginUser)
api_router.get('/logoutUser',userController.logout)
api_router.get('/me',isAuthenticatedUser,userController.getUserProfile)
api_router.put('/password/update',isAuthenticatedUser,userController.updatePassword)
api_router.put('/me/update',isAuthenticatedUser,userController.updateProfile)
api_router.get('/admin/users',isAuthenticatedUser,authorizeRoles('admin'),userController.allUser)
api_router.get('/admin/user/:id',isAuthenticatedUser,authorizeRoles('admin'),userController.getUserDetails)
api_router.put('/admin/user/:id',isAuthenticatedUser,authorizeRoles('admin'),userController.updateUser)
api_router.delete('/admin/user/:id',isAuthenticatedUser,authorizeRoles('admin'),userController.deleteUser)





module.exports=api_router