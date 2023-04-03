const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema(
    {
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
            required:[true,"Course required"]
        },
        name:{
            type:String,
            required:[true,"Assignment name required"]
        },
        links:[
            {
                type:String
            }
        ],
        createdAt:{
            type:Date,
            default:Date.now()
        },
        dueDate:{
            type:Date,
        },
        submissions:[
            {
                student:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Student"
                },
                submittedAt:{
                    type:Date,
                    default:Date.now()
                },
                content:{
                    public_id:String,
                    url:String
                },
                grade:{
                    type:Number,
                    default:0
                },
                gradeStatus:{
                    type:Boolean,
                    default:false
                }
            }
        ]
    }
)

module.exports = mongoose.model("Assignment",assignmentSchema)