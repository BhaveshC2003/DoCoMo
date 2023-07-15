import axios from "axios"


//Uploading study material
export const uploadStudyMaterial = (details)=>async(dispatch)=>{
    try{
        dispatch({type:"UPLOAD_SM_REQUEST"})
        const {data} = await axios.post("http://localhost:9000/api/v1/studymaterial/upload",details,
        {headers:{"Content-Type":"multipart/form-data"},withCredentials:true})
        dispatch({type:"UPLOAD_SM_SUCCESS"})
    }catch(err){
        dispatch({type:"UPLOAD_SM_FAIL",payload:err.response?.data.message})
    }
}

//Getting studymaterials
export const getStudyMaterial = (details=null)=>async(dispatch)=>{
    try{
        dispatch({type:"GET_SM_REQUEST"})
        const query = details ? `?name=${details.name}&branch=${details.branch}&category=${details.category}` : ""
        const {data} = await axios.get("http://localhost:9000/api/v1/studymaterial"+query,{withCredentials:true})
        dispatch({type:"GET_SM_SUCCESS",payload:data.materials})
    }catch(err){
        dispatch({type:"GET_SM_FAIL",payload:err.response?.data.message})
    }
}