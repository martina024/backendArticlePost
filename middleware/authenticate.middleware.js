var jwt = require('jsonwebtoken');
require("dotenv").config()

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decodedToken=jwt.verify(token,process.env.key)
        if(decodedToken){
            const userID=decodedToken.userID
            // console.log(decodedToken)
            req.body.userID=userID
            next()
        }
        else{
            res.send({"message":"please login first"})
        }
    }
    else{
        res.send({"message":"please login first"})
    }
}

module.exports={authenticate}