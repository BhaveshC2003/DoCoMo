const router = require("express").Router()
const { getCommittees, createCommittee, removeCommittee, getCommitteeDetails, committeeRegister, getMyCommittees } = require("../../controller/committee/committee")
const authenticateUser = require("../../utils/Authenticate")
const {authorizeUser} = require("../../utils/Authorize")
const fileupload = require("express-fileupload")

router.route("/").get(getCommittees)
router.route("/me").get(authenticateUser,getMyCommittees)
router.route("/create").post(authenticateUser,authorizeUser,fileupload(),createCommittee)
router.route("/:id")
.get(authenticateUser,getCommitteeDetails)
.delete(authenticateUser,authorizeUser,removeCommittee)
router.route("/:id/register").post(authenticateUser,committeeRegister)

module.exports = router
