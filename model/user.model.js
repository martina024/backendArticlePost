const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number
},{
    versionKey:false
}
)

const UserModel = mongoose.model("User",userSchema)

module.exports={UserModel}