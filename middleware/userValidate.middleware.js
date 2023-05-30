const userValidator=(req,res,next)=>{
    if(req.url=="/signup"){
     if(req.body.name && req.body.email && req.body.password && req.body.age){
        if(typeof req.body.name==="string" &&
        typeof req.body.email==="string" &&
        typeof req.body.password==="string" &&
        typeof req.body.age=="number" )
        {

            next()
        }
        else{
            res.send({"message":"Wrong data type"})
        }
     }
     else{
        res.send({"message":"Data doesn't exist"})
     }
    }
    else{
        next()
    }
}

module.exports={userValidator}