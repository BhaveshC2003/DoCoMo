const express = require("express")
const authenticateUser = require("../../utils/Authenticate")
const mutler = require("multer")
const upload = mutler({storage:mutler.memoryStorage()})
const router = express.Router()
const {getStudyMaterial,uploadStudyMaterial} = require("../../controller/studyMaterial/studyMaterial")


router.route("/").get(getStudyMaterial)
router.route("/upload").post(authenticateUser,upload.single("file"),uploadStudyMaterial)

module.exports = router