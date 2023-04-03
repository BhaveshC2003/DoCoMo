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
        logo:{
            public_id:String,
            url:String
        },
        description:String,
        members:[
            {
                student:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Student"
                },
                role:{
                    type:String
                }
            }
        ],
        tags:[
            {
                type:String,
                minlength:3
            }
        ]
        
    }
)

module.exports = mongoose.exports("Committee",committeeSchema)