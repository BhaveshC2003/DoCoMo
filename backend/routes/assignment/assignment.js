const router = require("express").Router()
const { createAssignment, uploadAssignment, getAssignments, getStudentAssignments, gradeStudent } = require("../../controller/assignment/assignment")
const authenticateUser = require("../../utils/Authenticate")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})

router.route("/teacher")
.post(authenticateUser,createAssignment)
router.route("/teacher/grade")
.put(authenticateUser,gradeStudent)


router.route("/student/:id")
.post(authenticateUser,upload.single("file"),uploadAssignment)

router.route("/")
.get(authenticateUser,getAssignments)

router.route("/:course").get(getStudentAssignments)

module.exports = router