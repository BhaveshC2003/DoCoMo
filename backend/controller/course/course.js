const Course = require("../../models/Course/course")
const Teacher = require("../../models/Teacher/teacher")
const ErrorHandler = require("../../utils/error/errorHandler")
const catchError = require("../../utils/error/catchError")
const uploadImage = require("../../utils/uploadImage")
const Assignment = require("../../models/Assignment/assignment")

//Getting all courses
exports.getCourses = catchError(async(req,res,next)=>{
    let filter = {}
    const {teacher,name,branch} = req.query
    if(teacher){
        const teacherId = await Teacher.findOne({name:teacher}).select("_id")
        filter = {
            teacher:teacherId
        }
    }
     filter = {
        ...filter,
        branch:{
            $regex:branch || "",
            $options:"i"
        },
        name:{
            $regex:name || "",
            $options:"i"
        }
    }
    console.log(filter)
    const courses = await Course.find(filter)
    res.status(200).json({
        success:true,
        courses
    })
})

//Getting specific course details
exports.getCourseDetails = catchError(async(req,res,next)=>{
    const {id} = req.params
    const course = await Course.findById(id).populate("teacher","name")
    const assignments = await Assignment.find({course:id})
    const submissions = []
    assignments.forEach(a=>{
        const x = a.submissions.find(s=>s.student.toString() === req.user._id.toString())    
        submissions.push(x)
    })
    let enrolled = false
    if(req.user.role === "student"){
        enrolled = course.students.includes(req.user._id)
    }
    else{
        enrolled = course.teacher._id.toString() === req.user._id.toString()
        await course.populate("students")
    }
        
    console.log(enrolled)
    res.status(200).json({
        success:true,
        course,
        assignments,
        enrolled,
        submissions
    })
})

//Adding course --Teacher
exports.addCourse = catchError(async(req,res,next)=>{
    const courseDetails = req.body
    courseDetails.teacher = req.user._id
    const {public_id,secure_url} = await uploadImage(courseDetails.image,"Courses")
    courseDetails.image = {
        url:secure_url,
        public_id
    }
    const course = await Course.create(courseDetails)
    res.status(200).json({
        success:true,
        message:"Course added"
    })
})

//Deleting course --Teacher
exports.removeCourse = catchError(async(req,res,next)=>{
    const {id} = req.params
    await Course.findByIdAndDelete(id)
    res.status(200).json({
        success:true,
        message:"Course removed"
    })
})

//Joining a course --Student
exports.joinCourse = catchError(async(req,res,next)=>{
    const {id} = req.params
    const {key} = req.body
    const course = await Course.findById(id)
    if(key !== course.key)
        return next(new ErrorHandler(400,"Invaild key"))
    course.students.push(req.user._id)
    await course.save()
    res.status(200).json({
        success:true,
        message:"Course joined"
    })
})