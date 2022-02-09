const User = require('../models/user')
const bcrypt = require('bcryptjs')
const sendToken = require('../utils/jwtToken')
const ErrorHandler = require('../utils/errorhandler')
const user = require('../models/user')
const cloudinary = require('cloudinary')
exports.registerUser = async (req, res) => {
    try {
               
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        })

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 8),
            avatar: {
                public_id: result.public_id,
                url: result.secure_url
                // public_id: 'werefgergeg',
                // url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fhelpx.adobe.com%2Fphotoshop%2Fusing%2Fconvert-color-image-black-white.html&psig=AOvVaw1lBl5S3b-TnKe03DHYaQJa&ust=1642239921482000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCMDA1Mv6sPUCFQAAAAAdAAAAABAD'
            }
        })
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not found ",
                mess:error.stack
            })
        }
        else {

            sendToken(user, 200, res)
            
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.stack
        })
    }
}


exports.loginUser = async (req, res, next) => {

    const { email, password } = req.body

    // check if email and password is not entered by the user then 
    if (!email && password) {
        console.log(email);
        return next(new ErrorHandler('Enter Email Id and Password', 404))
    }
    else {
        //if finding user in database 
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return next(new ErrorHandler('Invalid Email or Password', 401))
        }
        else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isPasswordMatch) {
                return next(new ErrorHandler('Password is not matched', 404))
            }
            else {
                sendToken(user, 200, res)
                // const token = user.getJwtToken()
                // res.status(200).json({
                //     success: true,
                //     message: "User login sucessfull",
                //     token
                // })
            }
        }
    }
}


// logout user

exports.logout = async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
}

// get corrently login user details
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User Profile is :",
                user
            })
        }
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error

        })
    }
}

// update password after athountication 
exports.updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password')
        const isMatched = await user.comparePassword(req.body.oldPassword)
        if (!isMatched) {
            return next(new ErrorHandler('old Password is incorrect', 400))
        }
        else {
            user.password = await bcrypt.hash(req.body.password, 8)
            await user.save()
            sendToken(user, 200, res)
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

// update user profile 
exports.updateProfile = async (req, res , next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // update avtar todo
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    if (!user) {
        return next(new ErrorHandler('User Details is not able to update', 400))
    }
    else {
        sendToken(user, 200, res)
    }
}

//Get All user

exports.allUser = async(req,res,next)=>{
    try{
        const users = await User.find()
        if(!users)
        {
            return next(new ErrorHandler('All user is not Found', 400))
        }
        else
        {
                res.status(200).json({
                    success:true,
                    users
                })
        }
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

// Get User details  => 

exports.getUserDetails = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user)
        {
            return next(new ErrorHandler(`User is not found with id ${req.params.id}`, 400))
        }
        else
        {
            sendToken(user , 200 , res)
        }
    }
    catch(error)
    {
            res.status(500).json({
                success:false,
                message:error.stack
            })
    }
    
}

//update User profile by admin 
exports.updateUser = async (req, res , next) => {
    try{
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        }
        // update avtar todo
        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        if (!user) {
            return next(new ErrorHandler('User Details is not able to update', 400))
        }
        else {
            sendToken(user, 200, res)
        }
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.stack
        })
    }
    
}

// Delete User 
exports.deleteUser = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user)
        {
            return next(new ErrorHandler(`User is not found with id ${req.params.id}`, 400))
        }
        else
        {

            // remove avtar from clodary server 
            await user.deleteOne()
            res.status(200).json({
                success:true
            })
        }
    }
    catch(error)
    {
            res.status(500).json({
                success:false,
                message:error.stack
            })
    }
    
}