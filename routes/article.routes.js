const express=require("express");
const { ArticleModel }=require("../model/article.model");
const { UserModel }=require("../model/user.model");
const jwt=require('jsonwebtoken');
require("dotenv").config();

const articleRouter=express.Router();

// Middleware to authenticate the user
const authenticate=(req, res, next)=>{
const token=req.headers.authorization;
    if (token){
    const decodedToken=jwt.verify(token, process.env.key);
    if (decodedToken){
    const userID=decodedToken.userID;
    req.body.userID=userID;
    next();
    }
     else {
    res.send({ "message": "Please login first" });
    }
    } else {
    res.send({ "message": "Please login first" });
    }
}

// API to create an Article
articleRouter.post("/:userId/articles", authenticate, async (req, res) => {
const {userId}=req.params;
const payload=req.body;
try {
const user=await UserModel.findById(userId);
if (!user) {
return res.send({ "message": "User not found" });
}
payload.user=userId;
const new_article=new ArticleModel(payload);
await new_article.save();
res.send({ "message": "Added the article", new_article });

} catch (err) {
console.log(err);
res.send({ "message": "Something went wrong" });
}
});

// API to get all articles
articleRouter.get("/articles", authenticate, async (req, res) => {
try {
const articles=await ArticleModel.find().populate('user', 'name age');
res.send(articles);
} catch (err) {
console.log(err);
res.send({ "message": "Something went wrong" });
}
});

// API to update user profile (name and age)
articleRouter.patch("/users/:userId", authenticate, async (req, res) => {
const { userId }=req.params;
const { name, age }=req.body;

try {
const user=await UserModel.findByIdAndUpdate(userId, { name, age }, { new: true });
if (!user) {
return res.send({ "message": "User not found" });
}
res.send({ "message": "Updated user profile", user });
} catch (err) {
console.log(err);
res.send({ "message": "Something went wrong" });
}
});

module.exports={articleRouter};