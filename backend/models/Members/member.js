const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    committee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Committee"
    },
    status:{
        type:String,
        default:"Active"
    },
    role:{
        type:String,
        default:"Coordinator"
    }
})

module.exports = mongoose.model("Member",memberSchema)