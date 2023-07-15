const ErrorHandler = require("./error/errorHandler")
const catchError = require("./error/catchError")
const Committee = require("../models/Committee/committee")

//Authorizing teachers only
exports.authorizeUser = catchError(async(req,res,next)=>{
    if(req.user.role === "student")
        return next(new ErrorHandler(401,"You are not authorized"))
    return next()
})

exports.authorizeCommitteRights = catchError(async(req,res,next)=>{
    req.isAuthorized = false
    if(req.user.role === "teacher"){
        const member = await Committee.find({createdBy:req.user._id})
        if(!member)
            return next()
        req.isAuthorized = true
        return next()
    }
    const members = await Committee.find({members:{member:req.user._id,role:"chairman"}}).select("members")
    if(!members)
        return next()
    req.isAuthorized = true
    return next()
})