const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name required"],
        maxLenght: 20,
        minLenght: 5
    },
    password:{
        type:String,
        minLenght:5,
        required:[true,"Password required"]
    },
    email:{
        type:String,
        required:[true,"Email required"],
        unique:true
    },
    avatar:{
        public_id:String,
        url:String
    },
    studentId:{
        type:String,
        maxLenght:10,
        minLenght:10,
        required:[true,"Student Id required"],
        unique:true
    },
    phoneNumber:{
        type:String,
        required:[true,"Phone number required"],
        validate:{
            validator: function(data){
                return data.length === 10 ? true : false
            },
            message: "Not a valid number"
        }
    },
    gender:{
        type:String,
        required:[true,"Gender required"]
    },
    DOB:{
        type:Date
    },
    branch:{
        type:String,
        required:[true,"Please enter your branch"]
    },
    yearOfStudy:{
        type:String,
        required:[true,"Year of study required"]
    },
    status:{
        type:String,
        default:"Active"
    },
    courses:[
        {   
            type: mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    role:{
        type:String,
        required:[true,"Role required"]
    },
    verified:{
        type:Boolean,
        default:false
    }
})

//hashing password before saving to database
studentSchema.pre("save",async function(){
    if(this.isModified("password")){
        const hashedPassword = await bcrypt.hash(this.password,8)
        this.password = hashedPassword
    }
})

//Comparing passwords for login
studentSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports = mongoose.model("Student",studentSchema)