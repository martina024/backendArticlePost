const mongoose=require("mongoose")

const articleSchema=mongoose.Schema({
    "title":String,
    "body":String,
     "userID":String
   
},{
    versionKey:false
}
)

const ArticleModel = mongoose.model("article",articleSchema)

module.exports={ArticleModel}