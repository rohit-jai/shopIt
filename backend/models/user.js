const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const bcrypt = require('bcryptjs/dist/bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        trim: true,
        maxlength: [30, 'Your name cannot exceed 30 characters']
    },
    email:{
        type:String,
        required:[true, "Please enter your name"],
        trim: true,
        maxlength: [30, 'Your name cannot exceed 30 characters'],
        unique:true,
        validate:[validator.isEmail, "Please enter valid Email"],
        lowercase: true
    },
    password:{
        type:String,
        required:[true, "Please enter your name"],
        minlength: [4, 'Your password is longer then 4 character'],
        select: false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type: String,
        default: 'user'
    },
    createdAt:
    {
        type:Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date


})

//return json token 
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}  

// compare user password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//genrate password reset token

userSchema.methods.getResetPasswordToken = function(){
    //Genrate token
    const resetToken = crypto.randomBytes(20).toString('hex')

    // Has and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    //set token Expire Time
    this.resetPasswordExpire = Date.now() + 1000

    return resetToken
}

module.exports = mongoose.model('User', userSchema)