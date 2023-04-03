const jwt = require("jsonwebtoken")

const sendToken = (user,res)=>{
    const token = jwt.sign({_id:user._id,role:user.role},process.env.JWTSecret,{expiresIn:"1h"})
    const options = {
        maxAge: 3600000
        }
    res.cookie("token",token,options).status(200).json({
        success:true,
        user
    })
}

module.exports = sendToken