const router = require("express").Router()
const authenticateUser = require("../../utils/Authenticate")
const {addCourse, removeCourse,getCourses,getCourseDetails,joinCourse} = require("../../controller/course/course")
const fileUpload = require("express-fileupload")


router.route("/")
.get(getCourses)
.post(authenticateUser,fileUpload(),addCourse)

router.route("/:id")
.get(authenticateUser,getCourseDetails)
.delete(authenticateUser,removeCourse)
.post(authenticateUser,joinCourse)


module.exports = router