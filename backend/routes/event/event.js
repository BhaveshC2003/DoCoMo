const express = require("express")
const authenticateUser = require("../../utils/Authenticate")
const router = express.Router()
const {getEventDetails,getEvents, createEvent} = require("../../controller/event/event")
const fileupload = require("express-fileupload")
const {authorizeUser} = require("../../utils/Authorize")

router.route("/").get(getEvents)
router.route("/:id").get(getEventDetails)
router.route("/create").post(authenticateUser,fileupload(),createEvent)

module.exports = router