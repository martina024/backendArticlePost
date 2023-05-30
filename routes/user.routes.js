const express=require("express")

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/user.model");
require("dotenv").config()


const userRouter=express.Router()


   

userRouter.post("/signup" , async(req,res)=>{
    const {email,password,name,age}=req.body

    const userEmail=await UserModel.findOne({email})

    if(userEmail){
        res.send({"message":"This Email is already registered"})
    }
   else{
    try{
        bcrypt.hash(password, 5, async(err, secure_password)=> {
            if(err){
                console.log(err)
            }else{
                    const user = new UserModel({email,password:secure_password,name,age})
                    await user.save()
                    console.log(user)
                        res.send({"message" :"Registered Successfully"})
             }
    });
       
    }
    catch(err){
        console.log(err)
        console.log({"message":"Something went wrong in registering"})
    }
   }
  
})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.send({ "message": "Wrong credentials" });
      }
  
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, process.env.key);
          res.send({ "message": "Login successful", "token": token });
        } else {
          res.send({ "message": "Wrong credentials" });
        }
      });
    } catch (err) {
      console.log(err);
      res.send({ "message": "Something went wrong" });
    }
  });
  
  module.exports = { userRouter };
  