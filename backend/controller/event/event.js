const Event = require('../../models/Events/event')
const Committee = require('../../models/Committee/committee')
const ErrorHandler = require("../../utils/error/errorHandler")
const catchError = require("../../utils/error/catchError")
const uploadImage = require("../../utils/uploadImage")

//Getting events
exports.getEvents = catchError(async(req,res,next)=>{
    const {committees,categories,date} = req.query
    let filter = {}
    if(date)
        filter.eventDate = new Date(String(date.split("T")[0]).slice(1,13))
    
    const parsedCommittees = JSON.parse(committees)
    const parsedCategories = JSON.parse(categories)
    if(parsedCategories.length !== 0){
        filter.category = {
            $in:parsedCategories
        }
    }
    let committees_id = await Committee.find({name:{$in:parsedCommittees}}).select("_id")
    committees_id = committees_id.map((a)=>a._id)
    if(committees_id.length !== 0){
        filter.committee = {
            $in:committees_id
        }
    }
    const events = await Event.find(filter)
    res.status(200).json({
        success:true,
        events
    })
})

//Getting event details
exports.getEventDetails = catchError(async(req,res,next)=>{
    const {id} = req.params
    const event = await Event.findById(id).populate("committee","name")
    res.status(200).json({
        success:true,
        event
    })
})

//Creating Event --Teacher,Student(if authorized)
exports.createEvent = catchError(async(req,res,next)=>{
    const eventDetails = req.body
    const {public_id,secure_url} = await uploadImage(eventDetails.image,"Events")
    eventDetails.image = {
        url:secure_url,
        public_id
    }
    const event = await Event.create(eventDetails)
    res.status(200).json({
        success:true,
        event
    })
})