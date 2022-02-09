const Product = require('../models/productModel')
const {connectdatabase}  = require ('../config/database')
const products = require('../data/product.json')

// setting dotenv file
require('dotenv').config({ path: 'backend/config/config.env' })

connectdatabase()

const seedProducts = async() =>{
    try{
        await Product.deleteMany()
        console.log("Products are deleted ")

        await Product.insertMany(products)
        console.log("All Products are added ")
        process.exit()

    }
    catch(e)
    {
        console.log(e.message);
        process.exit()
    }
}

seedProducts()