const throwError = require("./utils/error/throwError")
const cookieParser = require("cookie-parser")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const fileupload = require("express-fileupload")
const app = express()

const commonRoutes = require("./routes/common/commonRoutes")

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileupload())

app.use("/api/v1",commonRoutes)

app.use(throwError)
module.exports = app