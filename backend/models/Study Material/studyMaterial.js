const mongoose = require("mongoose")

const studyMaterialSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name required"]
    },
    branch:{
        type:String
    },
    uploadedOn:{
        type:Date,
        default:Date.now()
    },
    category:{
        type:String
    },
    tags:[
        {
            type:String,
            minLenght:3
        }
    ],
    author:{
        type:String,
        default:"DoCoMo"
    },
    link:{
        type:String,
        required:[true,"Download link required"]
    }
})

module.exports = mongoose.model("StudyMaterial",studyMaterialSchema)