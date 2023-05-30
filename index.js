
const express=require("express")
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { userValidator } = require("./middleware/userValidate.middleware");
const { authenticate } = require("./middleware/authenticate.middleware");
const { articleRouter } = require("./routes/article.routes");
const { connection } = require("./config/db");

require("dotenv").config()

const app=express()

app.use(express.json())

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome to ArticlePosting")
})

app.use(userValidator)
app.use("/user", userRouter)



app.use(authenticate)
app.use("/", articleRouter)




app.listen((process.env.port), async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }
    catch(err){
        console.log("Not connected to DB")
        console.log(err)
    }
    console.log(`Server is running in port ${process.env.port} `)
})