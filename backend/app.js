const express = require('express')
const bodyParser =  require('body-parser')     // if we are  using express.json then we dont have need to use body parser 
const cloudinary = require('cloudinary')
const fileUpload = require('express-fileupload')
const productRouter = require("../backend/routes/product")
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')
const cookieParser = require('cookie-parser')
// const connectdatabase = require("./config/database")
const {connectdatabase}  = require ('./config/database')
const app = express()
const errorMiddelware = require('./middelwares/errors')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload())
//
//Setting up config file 
require('dotenv').config({ path: 'backend/config/config.env' })

// setting up cloudinary configration 

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use("/product",productRouter)
app.use("/user",userRouter)
app.use('/order',orderRouter)
 // now we are going to used error midelware 
 app.use(errorMiddelware)

// connecting with the database
connectdatabase()
app.listen(process.env.PORT, ()=>{
    console.log(`server is statrted on port ${process.env.PORT} in ${process.env.node_env} mode`);
})