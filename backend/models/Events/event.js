const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Event name required"]
        },
        committee:{
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
        eventDate:{
            type:Date,
            default:Date.now()
        },
        category:{
                type:String,
                minLenght:3
            },
        description:String,
        image:{
            url:String,
            public_id:String
            },
        link:{
            type:String,
            required:[true,"Registration link required"]
        }
}
)

module.exports = mongoose.model("Event",eventSchema)