const catchError = require("../../utils/error/catchError")
const Student = require("../../models/Student/student")
const Teacher = require("../../models/Teacher/teacher")
const Course = require("../../models/Course/course")
const Event = require('../../models/Events/event')
const ErrorHandler = require("../../utils/error/errorHandler")
const sendToken = require("../../utils/sendToken")
const uploadImage = require("../../utils/uploadImage")
const Committee = require("../../models/Committee/committee")
const StudyMaterial = require("../../models/Study Material/studyMaterial")

//Register user
exports.register = catchError(async(req,res,next)=>{
    const userDetails = req.body
    const {public_id,secure_url} = await uploadImage(userDetails.avatar,"Avatars")
    
    userDetails.avatar = {public_id,url:secure_url}
    let user = null
    if(userDetails.role === "student"){
        user = await Student.create(userDetails)
    }else if(userDetails.role === "teacher"){
        const subjects = userDetails['subjects[]']
        delete userDetails['subjects[]']
        userDetails.subjects = subjects
        console.log(userDetails)
        user = await Teacher.create(userDetails)
    }
    if(!user)
        next(new ErrorHandler())
    await user.save()
    sendToken(user,res)
})

//Login user 
exports.login = catchError(async(req,res,next)=>{
    const {email,password,role} = req.body
    let user = null
    if(!email || !password || !role)
        return next(new ErrorHandler(400,"Invaild credentials"))
    if(role === "teacher")
        user = await Teacher.findOne({email})
    else
        user = await Student.findOne({email})
    if(!user)
        return next(new ErrorHandler(400,`User not registered`))
    const isPassword = await user.comparePassword(password)
    if(!isPassword)
        return next(new ErrorHandler(400,"Invaild Password"))
    sendToken(user,res)
})

//Logout user
exports.logoutUser = catchError(async(req,res,next)=>{
    res.clearCookie("token")
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})

//Getting user details
exports.getUserDetails = catchError(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
})

//Forgot password --nodemailer




//Reset password --nodemailer




//Edit profile
exports.editProfile = catchError(async(req,res,next)=>{
    const {role,email} = req.user
    let user = null
    if(role === "teacher"){ 
        user = await Teacher.findOneAndUpdate({email},req.body)
    }else if(role === "student"){
        user = await Student.findOneAndUpdate({email},req.body)
    }
    res.status(200).json({
        success:true,
        user
    })
})


