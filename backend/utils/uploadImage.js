const cloudinary = require("cloudinary").v2

const uploadImage = async(image,folderName)=>{
    const result = await cloudinary.uploader.upload(image,{folder:folderName})
    return result
}

module.exports = uploadImage