const express=require("express")
const { UserModel } = require("../model/user.model")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config()


const userRouter=express.Router()


   

userRouter.post("/signup" , async(req,res)=>{
    const {email,password,name,age}=req.body
   
    try{
        bcrypt.hash(password, 5, async(err, secure_password)=> {
            if(err){
                console.log(err)
            }else{
                    const user = new UserModel({email,password:secure_password,name,age})
                    await user.save()
                    console.log(user)
                        res.send({"message" :"Registered"})
             }
    });
       
    }
    catch(err){
        console.log(err)
        console.log({"message":"Something went wrong in registering"})
    }
})


userRouter.post("/login" , async(req,res)=>{
    const {email,password}=req.body
    try{

        

        const user=await UserModel.find({
            email
       
        })
       console.log(user)
       
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result) =>{
             
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"message" :"login successuful","token":token})
                }
                else{
                    res.send({"message" :"wrong credientials"})
                }
            });
           
        }
        else{
            res.send({"message" :"wrong credientials"})
        }
       
        
       
    }
    catch(err){
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
})





module.exports={userRouter}