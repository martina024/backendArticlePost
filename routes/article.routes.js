const express=require("express")
const { ArticleModel } = require("../model/article.model")

const articleRouter=express.Router()

articleRouter.get("/",async(req,res)=>{
    // console.log(req.query);
    
       
        try{
        
            const articles=await ArticleModel.find()
            res.send(articles)
        }
        catch(err){
            console.log(err)
            res.send({"message":"Something went wrong"})
        }
    
   
   
  
})


articleRouter.post("/post",async(req,res)=>{
    const payload=req.body
    try{
        const new_article=new ArticleModel(payload)
        await new_article.save()
        res.send({"message":"Added the article",new_article})

    }catch(err){
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
    
})


articleRouter.patch("/update/:id",async(req,res)=>{
    const ID=req.params.id
    const payload=req.body
  
    try{
       
       const article=await ArticleModel.findByIdAndUpdate({_id:ID},payload)
        res.send({"message":"Updated the article",article})
        
    }catch(err){
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
   
})



articleRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id
   
   
    try{
        await ArticleModel.findByIdAndDelete({_id:ID})
        res.send({"message":"Deleted the article"})

    }catch(err){
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
    
   
})







module.exports={articleRouter}



