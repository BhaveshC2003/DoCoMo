const express = require("express")
const {register, login, editProfile, getUserDetails, logoutUser} = require("../../controller/common/common")
const authenticateUser = require("../../utils/Authenticate")
const fileupload = require("express-fileupload")
const router = express.Router()

//User
router.route("/register").post(fileupload(),register)
router.route("/login").post(login)
router.route("/logout").get(logoutUser)
router.route("/me").get(authenticateUser,getUserDetails)
router.route("/me/edit").put(authenticateUser,editProfile)


module.exports = router