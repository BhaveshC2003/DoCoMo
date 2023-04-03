const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const teacherSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Name required"],
            minLenght:5
        },
        password:{
            type:String,
            required:[true,"Password required"],
            minLenght:5
        },
        email:{
            type:String,
            required:[true,"Email required"],
            unique:true
        },
        gender:{
            type:String,
            required:[true,"Gender required"]
        },
        phoneNumber:{
            type:String,
            required:[true,"Contact number required"],
            validate:{
                validator: function(data){
                    return data.length === 10 ? true : false
                },
                message: "Not a valid number"
            }
        },
        DOB:{
            type:Date
        },
        avatar:{
            public_id:String,
            url:String
        },
        department:{
            type:String,
            required:[true,"Department required"]
        },
        about:String,
        qualification:{
            type:String,
            default:"Not specified"
        },
        subjects:[
            {
                type:String
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
    }
)

//hashing password before saving to database
teacherSchema.pre("save",async function(){
        if(this.isModified("password")){
            const hashedPassword = await bcrypt.hash(this.password,8)
            this.password = hashedPassword
        }
})

//Comparing passwords for login
teacherSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

module.exports = mongoose.model("Teacher",teacherSchema)