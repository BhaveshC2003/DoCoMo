const throwError = require("./utils/error/throwError")
const cookieParser = require("cookie-parser")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const fileupload = require("express-fileupload")
const app = express()

const commonRoutes = require("./routes/common/commonRoutes")
const courseRoutes = require("./routes/course/course")
const eventRoutes = require("./routes/event/event")
const studyMaterialRoutes = require("./routes/studyMaterial/studyMaterial")
const committeeRoutes = require("./routes/committee/committee")
const assignmentRoutes = require("./routes/assignment/assignment")

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(bodyParser.urlencoded({ extended: true }))


app.use("/api/v1",commonRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/event",eventRoutes)
app.use("/api/v1/studymaterial",studyMaterialRoutes)
app.use("/api/v1/committee",committeeRoutes)
app.use("/api/v1/assignment",assignmentRoutes)

app.use(throwError)
module.exports = app