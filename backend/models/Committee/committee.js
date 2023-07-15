const mongoose = require("mongoose")

const committeeSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Committee name required"],
            minLenght:3
        },
        key:{
            type:String,
            required:[true,"Key required"]
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Teacher"
            },
        image:{
            public_id:String,
            url:String
        },
        description:String,
        tags:[
            {
                type:String,
                minlength:3
            }
        ],
        createdAt:{
            type:Date,
            default:Date.now()
        }
    }
)

module.exports = mongoose.model("Committee",committeeSchema)