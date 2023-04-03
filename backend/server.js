const app = require("./app")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cloudinary = require("cloudinary").v2
dotenv.config({path:"config/config.env"})

mongoose.connect("mongodb://127.0.0.1:27017/CollegePortal", {useNewUrlParser: true,useUnifiedTopology: true,})
.then(()=>console.log("Connected to mongoDB"))
.catch((err)=>console.error("Error while connecting mongoDB",err))

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})
