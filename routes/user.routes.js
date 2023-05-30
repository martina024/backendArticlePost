const express=require("express")
require("dotenv").config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/user.model");


const userRouter=express.Router()


userRouter.post("/signup", async (req, res) => {
    const { email, password, name, age } = req.body;
  
    try {
      const userEmail = await UserModel.findOne({ email });
  
      if (userEmail) {
        return res.send({ "message": "This Email is already registered" });
      }
  
      bcrypt.hash(password, 5, async (err, hashedPassword) => {
        if (err) {
          console.log(err);
          return res.send({ "message": "SignUp failed, please try again" });
        }
        else{
            const user = new UserModel({
                email,
                password: hashedPassword,
                name,
                age
              });
              await user.save();
              console.log(user);
              res.send({ "message": "Registered Successfully" });
        }
  
       
      });
    } 
    catch (err) {
      console.log(err);
      res.send({ "message": "SignUp failed, please try again" });
    }
  });
  


userRouter.post("/login" , async(req,res)=>{
    const {email,password}=req.body
    try{

    const user=await UserModel.find({email})
       console.log(user)
       
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result) =>{
               
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"message" :"Login successuful","token":token})
                }
                else{
                    res.send({"message" :"Wrong Credientials"})
                }
            });
           
        }
        else{
            res.send({"message" :"Wrong Credientials"})
        }
       
        
       
    }
    catch(err){
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
})



module.exports={userRouter}