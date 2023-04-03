const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Event name required"]
        },
        hostedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Committee"
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        dueDate:{
            type:Date
        },
        tags:[
            {
                type:String,
                minLenght:3
            }
        ],
        participants:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Student"
            }
        ],
        description:String,
        images:{
            banner:{
                public_id:String,
                url:String
                },
            eventImage:{
                public_id:String,
                url:String
                }
            }
}
)

module.exports = mongoose.model("Event",eventSchema)