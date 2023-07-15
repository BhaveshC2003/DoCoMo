const Committee = require("../../models/Committee/committee")
const Member = require("../../models/Members/member")
const catchError = require("../../utils/error/catchError")
const ErrorHandler = require("../../utils/error/errorHandler")
const uploadImage = require("../../utils/uploadImage")

//Getting committees
exports.getCommittees = catchError(async(req,res,next)=>{
    const {names,tags} = req.query
    const namesArr = JSON.parse(names)
    const filter = {}
    if(namesArr.length !== 0){
        filter.name = {
            $in:namesArr
        }
    }
    if(tags){
        const tagsArr = JSON.parse(tags)
        filter.tags = {
            $in:tagsArr
        }
    }
    const committees = await Committee.find(filter)
    res.status(200).json({
        success:true,
        committees
    })
})

//Getting user committees
exports.getMyCommittees = catchError(async(req,res,next)=>{
    let committees = null
    if(req.user.role === "student")
        committees = await Member.find({student:req.user._id}).populate("committee")
    if(req.user.role === "teacher")
        committees = await Committee.find({createdBy:req.user._id})
    res.status(200).json({
        success:true,
        committees
    })
})

//Getting committe details
exports.getCommitteeDetails = catchError(async(req,res,next)=>{
    const committee = await Committee.findById(req.params.id)
                        .populate({
                            path:"createdBy",
                            select:"name avatar"
                        })
    const members = await Member.find({committee:req.params.id}).populate("student","name avatar")
    let isMember = null
    if(req.user.role === "student"){
        isMember = await Member.findOne({student:req.user._id,_id:req.params.id,role:"chairman"})
    }
        
    if(req.user.role === "teacher"){
        isMember = await Committee.findOne({createdBy:req.user._id})
    }
        
    const isAuthorized = isMember ? true : false
    res.status(200).json({
        success:true,
        committee,
        members,
        isAuthorized
    })
})

//Creating committee
exports.createCommittee = catchError(async(req,res,next)=>{
    let details = req.body
    const {public_id,secure_url} = await uploadImage(details.logo,"Committees")
    details = {...details,
        image:{
            url:secure_url,
            public_id
    },
    createdBy:req.user._id
    }
    const committee = await Committee.create(details)
    res.status(200).json({
        success:true,
        committee
    })
})

//Deleting committee
exports.removeCommittee = catchError(async(req,res,next)=>{
    await Committee.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        message:"Committe removed"
    })
})

//Joining a committee
exports.committeeRegister = catchError(async(req,res,next)=>{
    const {id} = req.params
    const member = await Member.create({student:req.user._id,committee:id,role:req.body.role})
    res.status(200).json({
        success:true,
        member
    })
})