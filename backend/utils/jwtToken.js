//create and send token and also save in the cookies 
const sendToken = (user,statusCode,res) => {
    //create jwt token
    const token = user.getJwtToken()
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIES_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    console.log("option is :" ,options);
    res.status(statusCode).cookie('token', token ,options).json({
        success:true,
        user,
        token
    })
}

module.exports = sendToken;