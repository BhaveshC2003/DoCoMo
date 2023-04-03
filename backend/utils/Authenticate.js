const catchError = require("./error/catchError")
const jwt = require("jsonwebtoken")
const Teacher = require("../models/Teacher/teacher")
const Student = require("../models/Student/student")
const ErrorHandler = require("./error/errorHandler")

const authenticateUser = catchError(async(req,res,next)=>{
    if(req.cookies && "token" in req.cookies){
        const {token} = req.cookies
        const {_id,role} = jwt.verify(token,process.env.JWTSecret)
        let user = null
        if(role === "teacher")
            user = await Teacher.findById(_id)
        else if(role === "student")
            user = await Student.findById(_id)
        req.user = user
        next()
    }else 
        next(new ErrorHandler(400,"You need to login."))
})

module.exports = authenticateUser