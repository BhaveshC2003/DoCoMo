const StudyMaterial = require("../../models/Study Material/studyMaterial")
const ErrorHandler = require("../../utils/error/errorHandler")
const catchError = require("../../utils/error/catchError")
const admin = require("firebase-admin") 

//Getting study materials
exports.getStudyMaterial = catchError(async(req,res,next)=>{
    const {name,branch,author,category} = req.query
    const filter = {
        name:{
            $regex:name || "",
            $options:"i"
        },
        branch:{
            $regex:branch || "",
            $options:"i"
        },
        author:{
            $regex:author || "",
            $options:"i"
        },
        category:{
            $regex:category || "",
            $options:"i"
        }
    }
    const materials = await StudyMaterial.find(filter)
    res.status(200).json({
        success:true,
        materials
    })
})

//Uploading files to firebase and saving there url in mongodb
exports.uploadStudyMaterial = catchError(async(req,res,next)=>{
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
        ...req.body,
        name: req.body.name || req.file.originalname,
        link:publicUrl
      }
      const studyMaterial = await StudyMaterial.create(details) 
      res.status(200).json({
          success:true,
          message:"File uploaded successfully"
      });
    });
    blobStream.end(req.file.buffer);
    
})