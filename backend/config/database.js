const mongoose = require('mongoose')

exports.connectdatabase = ()=>{
        mongoose.connect(process.env.DB_LOCAL_URI)
        .then((con)=> console.log(`Mongodb database is connected with the host : ${con.connection.host}`))
        .catch((error)=>{
            console.log("Data base is not connected ");
        })
}

//module.exports = connectdatabase