const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Course name required"],
            minLenght: [3,"Course name should be at least of 3 characters"]
        },
        key:{
            type:String,
            required:[true,"Erollment key required"],
            minLenght:5
        },
        teacher:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Teacher",
            required:[true,"Please assign a teacher to the course"]
        },
        students:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Student"
            }
        ],
        branch:{
            type:String,
            required:[true,"Course branch required"]
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        tags:[
            {
                type:String
            }
        ],
        links:[
            {
                type:String
            }
        ]
    }
)

module.exports = mongoose.model("Course",courseSchema)