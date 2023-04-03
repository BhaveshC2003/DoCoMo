const ErrorHandler = require("./errorHandler")

const catchError = callback=>(req,res,next)=>{
    try{
        callback(req,res,next)
    }catch(err){
        next(new ErrorHandler())
    }
}

module.exports = catchError