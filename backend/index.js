const express=require("express")
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())

require("dotenv").config()
require("./dbconfig")

let routes=require("./routes/userRoutes")
app.use("/user",routes)

app.listen(process.env.PORT,(err)=>{
    if (!err) {
        console.log("server start at 5000")
    }
    else{
        console.log(err)
    }
})