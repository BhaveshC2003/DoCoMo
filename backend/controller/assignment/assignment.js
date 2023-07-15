const Assignment = require("../../models/Assignment/assignment")
const Course = require("../../models/Course/course")
const catchError = require("../../utils/error/catchError")
const admin = require("firebase-admin") 
const nodemailer = require("nodemailer")

//Creating assignment --Teacher
exports.createAssignment = catchError(async(req,res,next)=>{
    const {courseId,name,dueDate} = req.body
    const assignment = await Assignment.create({course:courseId,name,dueDate})
    const course = await Course.findById(courseId).populate("students").populate("teacher")
    course.students.forEach(async(student)=>{
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.SMTP_EMAIL, 
            pass: process.env.SMTP_PASS,
        },
    })
    await transporter.sendMail({
      from: `${course.teacher.email}`,
      to: student.email, // list of receivers
      subject: "Assignment created", // Subject line
      text: `Assignment on ${name} of course ${course.name} has been assigned due date is ${dueDate}`, // plain text body
  });
  })
    res.status(200).json({
        success:true,
        message:"Assignment created"
    })
})

//Uploading assignment --Student
exports.uploadAssignment = catchError(async(req,res,next)=>{
    console.log("hey")
    const bucket = admin.storage().bucket()
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({contentType:"application/pdf",public:true});
    blobStream.on('error', err => {
      next(err);
    });
    blobStream.on('finish', async() => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      const details = {
        student:req.user._id,
        link:publicUrl,
        submittedAt:new Date(Date.now())
      }
      const {id} = req.params
      const assignment = await Assignment.findById(id)
      const alreadySubmitted = assignment.submissions.some(a=>a.student === req.user._id)
      if(!alreadySubmitted){
        assignment.submissions.push(details)
      }else{
        const newSub = assignment.submissions.filter(s=>s.student !== req.user._id)
        newSub.push(details)
        assignment.submissions = newSub
      }
      await assignment.save()
      res.status(200).json({
          success:true,
          message:"File uploaded successfully"
      });
    });
    blobStream.end(req.file.buffer);
})

//Getting user assignments --Student
exports.getAssignments = catchError(async(req,res,next)=>{
    const userCourses = await Course.find({students:req.user._id}).select("_id")
    const courseIds = userCourses.map(c=>c._id)
    const assignments = await Assignment.find({course:{$in:courseIds}})
    const submissions = []
    assignments.forEach(a=>{
        const x = a.submissions.find(s=>s.student.toString() === req.user._id.toString())    
        submissions.push(x)
    })
    res.status(200).json({
      success:true,
      assignments,
      submissions
    })
})

//Getting student assignment for specific course --Teacher
exports.getStudentAssignments = catchError(async(req,res,next)=>{
    const {course} = req.params
    const {student} = req.query
    const assignments = await Assignment.find({course:course})
    const submissions = []
    assignments.forEach(a=>{
        const x = a.submissions.find(s=>s.student.toString() === student)
        console.log(x)    
        submissions.push(x)
    })
    res.status(200).json({
      success:true,
      assignments,
      submissions
    })
})

//Grading student --Teacher
exports.gradeStudent = catchError(async(req,res,next)=>{
  const {id,grade,student} = req.body
    const assignment = await Assignment.findById(id)
    assignment.submissions.forEach(sub=>{
      if(sub.student.toString() === student.toString()){
        sub.grade = grade
        sub.gradeStatus = true
      }
    })
    await assignment.save()
    res.status(200).json({
      success:true,
      message:"Graded Successfully"
    })
})